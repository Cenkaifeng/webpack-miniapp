module.exports = {
  // 环境
  process: {
    envs: ['dev', 'production'],
    host: {
      'dev': 'test.com.cn'
    }
  },
  // 路径
  path: {
    tmp: '.tmp',
    src: './src',
    dist: './dist',
    serve: './serve',
    gulp: './gulp'  
  },
  //oss seting 腾讯云
  TencentOss: {
    SecretId: 'XXXXXXX',
    SecretKey: 'XXXXXXXX',
    Bucket: 'XXXXXXXXX',
    Region: 'XXXXXXX'
  },
  //oss aliyun
  AliyunOss: {
    region: 'oss-XX-XXXXX',
    accessKeyId: 'XXXXXX',
    accessKeySecret: 'XXXXXXXXXXXX',
    bucket: 'XXXXXXX'
  }
}

