import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "it非鱼的技术笔记",
  description: "it非鱼的技术文档和学习笔记",
  lang: 'zh-CN',
  lastUpdated: true,
  appearance: true,
  head: [
    ['link', { rel: 'icon', type: 'image/jpeg', href: '/logo.JPG' }]
  ],

  markdown: {
    lineNumbers: true,
    // 禁用死链接检查
    linkify: false,
    checkLinks: false
  },

  // 禁用死链接检查
  ignoreDeadLinks: true,
  
  themeConfig: {
    logo: '/logo.JPG',
    siteTitle: 'it非鱼的技术笔记',
    
    // 主题颜色配置
    colors: {
      primary: '#1e40af', // 深蓝色
    },

    // 导航栏
    nav: [
      { text: '首页', link: '/' },
      {
        text: '前端开发',
        items: [
          { text: 'Vue', link: '/frontend/vue/' },
          { text: 'JavaScript', link: '/frontend/javascript/' },
          { text: 'React', link: '/frontend/react/' },
          { text: '小程序', link: '/frontend/miniprogram/' }
        ]
      },
      {
        text: '后端开发',
        items: [
          { text: 'Java', link: '/backend/java/' },
          { text: 'Python', link: '/backend/python/' },
          { text: 'Node.js', link: '/backend/node/' }
        ]
      },
      {
        text: '运维部署',
        items: [
          { text: 'Linux', link: '/ops/linux/' },
          { text: 'Docker', link: '/ops/docker/' }
        ]
      },
      {
        text: '数据库',
        items: [
          { text: 'MySQL', link: '/database/mysql/' },
          { text: 'Redis', link: '/database/redis/' }
        ]
      },
      {
        text: '中间件',
        items: [
          { text: 'RabbitMQ', link: '/tools/mq/' }
        ]
      },
      {
        text: '开发工具',
        items: [
          { text: 'MacOS', link: '/tools/macos/' }
        ]
      },
      { text: 'AI 开发', link: '/ai/' },
      { text: '关于', link: '/about/' }
    ],

    // 侧边栏
    sidebar: {
      '/about/': [
        {
          text: '关于',
          collapsed: false,
          items: [
            { text: '关于本站', link: '/about/index' }
          ]
        }
      ],
      '/frontend/vue/': [
        {
          text: 'Vue',
          collapsed: false,
          items: [
            { text: '组件开发', link: '/frontend/vue/01-vue-component' },
            { text: '打印插件使用指南', link: '/frontend/vue/02-vue-print-nb-guide' },
            { text: 'Vue3新特性', link: '/frontend/vue/03-vue3-new-features' },
            { text: '白屏问题排查', link: '/frontend/vue/04-vue-white-screen' }
          ]
        }
      ],
      '/frontend/javascript/': [
        {
          text: 'JavaScript',
          collapsed: false,
          items: [
            { text: 'ES6+特性', link: '/frontend/javascript/01-es6-plus-features' },
            { text: 'Web开发实例', link: '/frontend/javascript/02-javascript-web-examples' }
          ]
        }
      ],
      '/frontend/react/': [
        {
          text: 'React',
          collapsed: false,
          items: [
            { text: '性能优化', link: '/frontend/react/01-react-performance' },
            { text: 'Hooks性能优化', link: '/frontend/react/01-react-hooks-performance' }
          ]
        }
      ],
      '/frontend/miniprogram/': [
        {
          text: '小程序',
          collapsed: false,
          items: [
            { text: '微信提现指南', link: '/frontend/miniprogram/01-wechat-withdraw-guide' }
          ]
        }
      ],
      '/backend/java/': [
        {
          text: 'Java',
          collapsed: false,
          items: [
            { text: 'Java锁使用指南', link: '/backend/java/01-java-lock-guide' },
            { text: '第一个SpringBoot项目', link: '/backend/java/02-first-springboot-project' }
          ]
        }
      ],
      '/backend/python/': [
        {
          text: 'Python',
          collapsed: false,
          items: [
            { text: 'Python基础', link: '/backend/python/01-python-basics' },
            { text: 'Django开发', link: '/backend/python/02-django-development' }
          ]
        }
      ],
      '/backend/node/': [
        {
          text: 'Node.js',
          collapsed: false,
          items: [
            { text: 'Express开发', link: '/backend/node/01-express-development' },
            { text: 'Koa2开发', link: '/backend/node/02-koa2-development' }
          ]
        }
      ],
      '/ops/linux/': [
        {
          text: 'Linux',
          collapsed: false,
          items: [
            { text: 'Linux常用命令', link: '/ops/linux/01-linux-commands' },
            { text: 'Shell脚本开发', link: '/ops/linux/02-shell-script' }
          ]
        }
      ],
      '/ops/docker/': [
        {
          text: 'Docker',
          collapsed: false,
          items: [
            { text: 'Docker基础', link: '/ops/docker/01-docker-basics' },
            { text: 'Docker Compose', link: '/ops/docker/02-docker-compose' }
          ]
        }
      ],
      '/database/mysql/': [
        {
          text: 'MySQL',
          collapsed: false,
          items: [
            { text: 'MySQL优化', link: '/database/mysql/01-mysql-optimization' },
            { text: 'MySQL事务', link: '/database/mysql/02-mysql-transaction' }
          ]
        }
      ],
      '/database/redis/': [
        {
          text: 'Redis',
          collapsed: false,
          items: [
            { text: 'Redis基础', link: '/database/redis/01-redis-basics' },
            { text: 'Redis分布式锁', link: '/database/redis/02-redis-distributed-lock' }
          ]
        }
      ],
      '/tools/mq/': [
        {
          text: 'RabbitMQ',
          collapsed: false,
          items: [
            { text: 'RabbitMQ基础', link: '/tools/mq/01-rabbitmq-basics' },
            { text: 'RabbitMQ进阶', link: '/tools/mq/02-rabbitmq-advanced' }
          ]
        }
      ],
      '/tools/macos/': [
        {
          text: 'MacOS',
          collapsed: false,
          items: [
            { text: 'MacOS开发环境配置', link: '/tools/macos/01-macos-dev-setup' },
            { text: 'MacOS效率工具', link: '/tools/macos/02-macos-productivity-tools' }
          ]
        }
      ],
      '/ai/': [
        {
          text: 'AI开发',
          collapsed: false,
          items: [
            { text: 'ChatGPT开发指南', link: '/ai/01-chatgpt-development' },
            { text: 'AI模型训练', link: '/ai/02-ai-model-training' }
          ]
        }
      ]
    },

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/funnywus/teah-notes' },
      { icon: { svg: '<svg t="1703661762961" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4066" width="128" height="128"><path d="M512 1024C229.222 1024 0 794.778 0 512S229.222 0 512 0s512 229.222 512 512-229.222 512-512 512z m259.149-568.883h-290.74a25.293 25.293 0 0 0-25.292 25.293l-0.026 63.206c0 13.952 11.315 25.293 25.267 25.293h177.024c13.978 0 25.293 11.315 25.293 25.267v12.646a75.853 75.853 0 0 1-75.853 75.853h-240.23a25.293 25.293 0 0 1-25.267-25.293V417.203a75.853 75.853 0 0 1 75.827-75.853h353.946a25.293 25.293 0 0 0 25.267-25.292l0.077-63.207a25.293 25.293 0 0 0-25.268-25.293H417.152a189.62 189.62 0 0 0-189.62 189.645V771.15c0 13.977 11.316 25.293 25.294 25.293h372.94a170.65 170.65 0 0 0 170.65-170.65V480.384a25.293 25.293 0 0 0-25.293-25.267z" fill="currentColor" p-id="4067"></path></svg>' }, link: 'https://gitee.com/funnywuss/tech-notes' },
    ],

    // 搜索
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },

    // 文章更新时间
    lastUpdatedText: '最后更新于',

    // 文档页脚
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    // 页脚
    footer: {
      message: '基于 MIT 许可发布',
      copyright: 'Copyright 2023-present it非鱼'
    },

    // 编辑链接
    editLink: {
      pattern: 'https://github.com/funnywus/teah-notes/edit/main/:path',
      text: '在 GitHub 上编辑此页'
    }
  }
})
