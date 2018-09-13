import mongoose from 'mongoose'

const Search  =mongoose.model('Search')


export const getSearch=async(_id)=>{
    const data =await Search.find({})
    return data
}

