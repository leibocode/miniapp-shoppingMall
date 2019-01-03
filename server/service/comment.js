import mongoose from 'mongoose'

const User = mongoose.model('User')
const Comment = mongoose.model('Comment')
const Product = mongoose.model('Product')

export default class commentService {
    async del(){
        const data = await Comment.findOne({
             _id: id
        })
        if (!data) {
             //报错
        }

        await data.remove()
    }

    async list(id) {
        const data = await Comment.find({
            product: id
        }).exec()
        return data
    }

    async update(){

    }

    async commentsByUserId(uid){
        const data = await Comment.find({
            user:uid
        }).exec()
        return data
    }

    async create(param){
        let comment = new Comment({
            content:param.content,
            product:param.productId,
            user:param.userId
        })

        await comment.save()
    }
}

