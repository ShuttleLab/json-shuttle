/**
 * 中英文文案
 */

export const messages = {
  zh: {
    nav: {
      home: "首页",
      about: "关于",
      mainAria: "主导航",
      githubAria: "在 GitHub 上查看 JSON Shuttle",
    },
    home: {
      title: "JSON Shuttle",
      subtitle:
        "快速校验、格式化与修补 JSON，支持美化、压缩与转义，安全本地处理。",
      sectionTitle: "主内容区",
      sectionDesc:
        "此处将放置 JSON 工具（校验、格式化、修补、转义等）的主界面与操作区域。",
    },
    jsonValidator: {
      title: "JSON 校验",
      placeholder: "粘贴或输入 JSON 文本…",
      validate: "校验",
      clear: "清空",
      beautify: "美化",
      minify: "压缩",
      valid: "校验通过",
      invalid: "校验失败",
      line: "行",
      column: "列",
      errorMessage: "错误信息",
      errorSnippet: "错误行",
      ariaLabelInput: "JSON 输入框",
      ariaLabelValidate: "校验 JSON",
      ariaLabelBeautify: "美化为标准格式",
      ariaLabelMinify: "压缩为最短内容",
      formatResult: "格式化结果",
      copyResult: "复制结果",
      copied: "已复制",
      errorLineHint: "错误行已在左侧行号中标红",
    },
    jsonRepair: {
      title: "JSON 格式修补",
      placeholder: "粘贴或输入可能错误的 JSON…",
      repair: "一键修补",
      clear: "清空",
      repairResult: "修补结果",
      apply: "一键应用",
      copyResult: "复制结果",
      copied: "已复制",
      repairFailed: "修补失败",
      repairedLinesHint: "高亮行为修补后的内容",
      ariaLabelInput: "JSON 输入框",
      ariaLabelRepair: "一键修补为合法 JSON",
      ariaLabelApply: "将修补结果应用到输入框",
    },
    jsonEscape: {
      title: "JSON 转义 / 去除转义",
      inputPlaceholder: "输入要转义或去除转义的文本…",
      outputPlaceholder: "结果将显示在这里",
      escape: "一键转义",
      unescape: "一键去除转义",
      copyOutput: "复制结果",
      copied: "已复制",
      ariaLabelInput: "转义输入框",
      ariaLabelOutput: "转义结果",
      ariaLabelEscape: "转义（如 \" → \\\"）",
      ariaLabelUnescape: "去除转义（如 \\\" → \"）",
      unescapeError: "去除转义失败",
    },
    about: {
      title: "关于 JSON Shuttle",
      description:
        "关于页内容将在此处展示（服务介绍、安全特性、使用场景、支持我们、联系方式等）。",
      intro: {
        title: "服务介绍",
        body: "JSON Shuttle 是一款在浏览器本地运行的 JSON 工具，提供校验、格式化、修补与转义功能。无需上传数据到服务器，所有处理均在您的设备上完成，兼顾效率与隐私。",
      },
      security: {
        title: "安全特性",
        local: {
          title: "本地处理",
          desc: "所有 JSON 均在浏览器内处理，数据不离开您的设备。",
        },
        noUpload: {
          title: "无数据上传",
          desc: "不向任何服务器发送您的内容，无日志、无追踪。",
        },
        openSource: {
          title: "开源透明",
          desc: "代码可审计，构建与部署流程透明，可自托管使用。",
        },
        privacy: {
          title: "隐私保护",
          desc: "不收集个人数据，不设账号体系，用完即走。",
        },
      },
      useCases: {
        title: "使用场景",
        items: "开发调试、接口联调、配置校验、日志格式化、教学演示、快速修正常见 JSON 语法错误。",
      },
      support: {
        title: "支持我们",
        supportBtn: "支持项目",
        shareBtn: "分享给朋友",
        copiedHint: "已经复制网址，可以直接发给好友",
        paymentModalTitle: "请支持我",
        paymentModalClose: "关闭",
        alipay: "支付宝",
        paypal: "PayPal",
        wechat: "微信",
      },
      contact: {
        title: "联系方式",
        email: "邮箱：",
        emailValue: "shuttlelab.org@gmail.com",
      },
    },
    footer: {
      rights: "保留所有权利。",
      navAria: "页脚导航",
    },
    common: {
      appName: "JSON Shuttle",
    },
    lang: {
      zh: "中文",
      en: "English",
      switcherAria: "切换语言",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      mainAria: "Main navigation",
      githubAria: "View JSON Shuttle on GitHub",
    },
    home: {
      title: "JSON Shuttle",
      subtitle:
        "Validate, format, and fix JSON quickly. Pretty-print, minify, escape—all processed locally and securely.",
      sectionTitle: "Main content",
      sectionDesc:
        "The main JSON tools (validate, format, fix, escape) will live here.",
    },
    jsonValidator: {
      title: "JSON Validator",
      placeholder: "Paste or type JSON here…",
      validate: "Validate",
      clear: "Clear",
      beautify: "Beautify",
      minify: "Minify",
      valid: "Valid JSON",
      invalid: "Invalid JSON",
      line: "Line",
      column: "Column",
      errorMessage: "Error",
      errorSnippet: "Error line",
      ariaLabelInput: "JSON input",
      ariaLabelValidate: "Validate JSON",
      ariaLabelBeautify: "Beautify to standard format",
      ariaLabelMinify: "Minify to shortest form",
      formatResult: "Formatted result",
      copyResult: "Copy result",
      copied: "Copied",
      errorLineHint: "Error line is highlighted in red in the gutter.",
    },
    jsonRepair: {
      title: "JSON Format Repair",
      placeholder: "Paste or type possibly invalid JSON…",
      repair: "Repair",
      clear: "Clear",
      repairResult: "Repaired result",
      apply: "Apply",
      copyResult: "Copy result",
      copied: "Copied",
      repairFailed: "Repair failed",
      repairedLinesHint: "Highlighted lines are the repaired content.",
      ariaLabelInput: "JSON input",
      ariaLabelRepair: "Repair to valid JSON",
      ariaLabelApply: "Apply repaired result to input",
    },
    jsonEscape: {
      title: "JSON Escape / Unescape",
      inputPlaceholder: "Enter text to escape or unescape…",
      outputPlaceholder: "Result will appear here",
      escape: "Escape",
      unescape: "Unescape",
      copyOutput: "Copy result",
      copied: "Copied",
      ariaLabelInput: "Escape input",
      ariaLabelOutput: "Escape result",
      ariaLabelEscape: "Escape (e.g. \" → \\\")",
      ariaLabelUnescape: "Unescape (e.g. \\\" → \")",
      unescapeError: "Unescape failed",
    },
    about: {
      title: "About JSON Shuttle",
      description:
        "About page content will go here (service intro, security, use cases, support, contact).",
      intro: {
        title: "Service Introduction",
        body: "JSON Shuttle is a browser-based JSON tool that validates, formats, repairs, and escapes JSON. All processing runs locally on your device—no data is sent to any server—so you get both speed and privacy.",
      },
      security: {
        title: "Security & Privacy",
        local: {
          title: "Local Processing",
          desc: "All JSON is handled in your browser; your data never leaves your device.",
        },
        noUpload: {
          title: "No Data Upload",
          desc: "We don't send your content anywhere—no logging, no tracking.",
        },
        openSource: {
          title: "Open & Transparent",
          desc: "Code is auditable; build and deploy are transparent; you can self-host.",
        },
        privacy: {
          title: "Privacy First",
          desc: "No personal data collection, no accounts—use and leave.",
        },
      },
      useCases: {
        title: "Use Cases",
        items: "Development and debugging, API integration, config validation, log formatting, teaching and demos, fixing common JSON syntax errors.",
      },
      support: {
        title: "Support Us",
        supportBtn: "Support Project",
        shareBtn: "Share with Friends",
        copiedHint: "URL copied. You can share it with friends.",
        paymentModalTitle: "Please support me",
        paymentModalClose: "Close",
        alipay: "Alipay",
        paypal: "PayPal",
        wechat: "WeChat",
      },
      contact: {
        title: "Contact",
        email: "Email: ",
        emailValue: "shuttlelab.org@gmail.com",
      },
    },
    footer: {
      rights: "All rights reserved.",
      navAria: "Footer navigation",
    },
    common: {
      appName: "JSON Shuttle",
    },
    lang: {
      zh: "中文",
      en: "English",
      switcherAria: "Switch language",
    },
  },
} as const;

export type Locale = keyof typeof messages;
export type MessageKey = keyof (typeof messages)["zh"];
