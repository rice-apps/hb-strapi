// ~/strapi-aws-s3/backend/config/plugins.js
    
module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        accessKeyId: env('AWS_ACCESS_KEY_ID'),
        secretAccessKey: env('AWS_ACCESS_SECRET'),
        region: env('AWS_REGION'),
        params: {
          ACL: env('AWS_ACL', 'public-read'),
          signedUrlExpires: env('AWS_SIGNED_URL_EXPIRES', 15 * 60),
          Bucket: env('AWS_BUCKET'),
        },
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
  'transformer': {
    enabled: true,
    config: {
      responseTransforms: {
        removeAttributesKey: true,
        removeDataKey: true,
      },
    }
  },
  'import-export-entries': {
    enabled: true,
    config: {
      // See `Config` section.
    },
  },
  'twilio-send-all': {
    enabled: true,
    resolve: './src/plugins/twilio-send-all'
  },
  "image-optimizer": {
    enabled: false,
    config: {
      include: ["jpeg", "jpg", "png"],
      exclude: ["gif"],
      formats: ["original", "webp", "avif"],
      sizes: [
        {
          name: "xs",
          width: 300,
        },
        {
          name: "sm",
          width: 768,
        },
        {
          name: "md",
          width: 1280,
        },
        {
          name: "lg",
          width: 1920,
        },
        {
          name: "xl",
          width: 2840,
          // Won't create an image larger than the original size
          withoutEnlargement: true,
        },
        {
          // Uses original size but still transforms for formats
          name: "original",
        },
      ],
      additionalResolutions: [1.5, 3],
      quality: 70,
    },
  },
});
