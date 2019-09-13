require('dotenv').config()
const AWS = require('aws-sdk')
const s3 = new AWS.S3()
const s3location = 'mnrhandover'

const bucket = new AWS.S3({
  credentials: {
    accessKeyId: process.env.S3_KEY_ID,
    secretAccessKey: process.env.S3_ACCESS_KEY
  }
})

const params = {
  Bucket: s3location,
  Prefix: 'sandbox/lottery/md/v2/assets/'
}

bucket.listObjects(params, (err, data) => {
  if (err) return console.error(err)

  var fileStream = s3.getObject(options).createReadStream()

  console.log(data)
})

console.log(bucket)
