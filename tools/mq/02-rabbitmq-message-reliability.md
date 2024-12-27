# RabbitMQ 如何保证消息可靠性投递？

> RabbitMQ 的消息从发送到接收要经过三个阶段：生产者发送消息、RabbitMQ 存储消息、消费者接收消息。每个阶段都需要相应的机制来保证消息不丢失。

## 一、生产者端

### 1.1 发布确认机制（Publisher Confirms）
```java
@Configuration
public class RabbitConfig {
    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        // 开启发布确认
        rabbitTemplate.setConfirmCallback((correlationData, ack, cause) -> {
            if (!ack) {
                log.error("消息发送失败：" + cause);
                // 重试机制
                retryMessage(correlationData);
            }
        });
        return rabbitTemplate;
    }
}
```

### 1.2 消息落库
```java
@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private RabbitTemplate rabbitTemplate;
    
    public void sendMessage(String message) {
        // 1. 消息保存到数据库
        MessageLog messageLog = new MessageLog();
        messageLog.setMessageId(UUID.randomUUID().toString());
        messageLog.setMessage(message);
        messageLog.setStatus(0); // 0:投递中
        messageRepository.save(messageLog);
        
        // 2. 发送消息
        rabbitTemplate.convertAndSend("exchange", "routingKey", message);
    }
}
```

## 二、RabbitMQ 服务端

### 2.1 队列和消息持久化
```java
@Bean
public Queue durableQueue() {
    // durable=true 表示队列持久化
    return new Queue("durable.queue", true);
}

public void sendPersistentMessage(String message) {
    // 设置消息持久化
    MessageProperties properties = MessagePropertiesBuilder.newInstance()
        .setDeliveryMode(MessageDeliveryMode.PERSISTENT)
        .build();
    Message msg = MessageBuilder.withBody(message.getBytes())
        .andProperties(properties)
        .build();
    
    rabbitTemplate.send("exchange", "routingKey", msg);
}
```

### 2.2 集群高可用
```properties
# rabbitmq.conf
# 镜像队列配置
ha-mode=all
ha-sync-mode=automatic
```

## 三、消费者端

### 3.1 手动确认机制
```java
@Component
public class MessageConsumer {
    @RabbitListener(queues = "queue.name")
    public void handleMessage(Message message, Channel channel) throws IOException {
        try {
            // 处理消息
            processMessage(message);
            
            // 手动确认
            channel.basicAck(message.getMessageProperties().getDeliveryTag(), false);
        } catch (Exception e) {
            // 处理失败，重新入队
            channel.basicNack(message.getMessageProperties().getDeliveryTag(), false, true);
        }
    }
}
```

### 3.2 幂等性保证
```java
@Service
public class IdempotentConsumer {
    @Autowired
    private RedisTemplate<String, String> redisTemplate;
    
    public void handleMessage(Message message) {
        String messageId = message.getMessageProperties().getMessageId();
        
        // 判断消息是否已经处理过
        if (redisTemplate.hasKey("processed:" + messageId)) {
            return;
        }
        
        // 处理消息
        processMessage(message);
        
        // 标记消息已处理
        redisTemplate.opsForValue().set("processed:" + messageId, "1", 24, TimeUnit.HOURS);
    }
}
```

## 四、总结

RabbitMQ 保证消息可靠性投递的核心机制：

1. **生产者端**：
   - 开启发布确认机制
   - 消息落库，用于重试

2. **RabbitMQ 服务端**：
   - 开启队列和消息持久化
   - 配置镜像队列保证高可用

3. **消费者端**：
   - 手动 ACK 确认
   - 保证幂等性消费

通过以上机制的组合使用，可以最大程度保证消息不丢失、不重复消费。根据业务的具体需求，可以选择合适的机制组合使用。
