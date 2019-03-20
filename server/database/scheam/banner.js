import mongoose from 'mongoose'
const Schema = mongoose.Schema
const Mixed = Schema.Types.Mixed
const ObjectId = Schema.Types.ObjectId

/**
 * 首页轮播集合
 */
const BannerSchema = new Schema({
    title: String,
    img: String,
    products: [{
        type: ObjectId,
        ref: 'Product'
    }],
    meta: {
        createdAt: {
            type: Date,
            default: Date.now()
        },
        updatedAt: {
            type: Date,
            default: Date.now()
        }
    }
})

BannerSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createdAt = this.meta.updatedAt = Date.now()
    } else {
        this.meta.updatedAt = Date.now()
    }

    next()
})

mongoose.model('Banner', BannerSchema)