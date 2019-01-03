import mongoose from 'mongoose'
const Schema = mongoose.Schema
const Mixed = Schema.Types.Mixed
const ObjectId = Schema.Types.ObjectId
//主题
const SpecialSchema = new Schema({
    title: String,
    poster: String,
    summary: String,
    products: [{
        type: ObjectId,
        ref: 'Product'
    }],
    meta: {
        createdAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
})

SpecialSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createdAt = this.meta.updatedAt = Date.now()
    } else {
        this.meta.updatedAt = Date.now()
    }

    next()
})

mongoose.model('Special', SpecialSchema)

