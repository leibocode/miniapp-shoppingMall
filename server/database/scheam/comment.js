import mongoose from 'mongoose'

const { Schema } = mongoose

const { ObjectId } = Schema.Types

const CommentSchema = new Schema({
    content: String,
    product: {
        type: ObjectId,
        ref: 'Product'
    },
    user: {
        type: ObjectId,
        ref: 'User'
    },
    meta: {
        updateAt: {
            type: Date,
            default: Date.now()
        },
        createdAt: {
            type: Date,
            default: Date.now()
        }
    }
})

CommentSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.updateAt = this.meta.createdAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }
})

mongoose.model('Comment', CommentSchema)