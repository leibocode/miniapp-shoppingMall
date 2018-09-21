import mongoose from 'mongoose'

const Search  =mongoose.model('Search')


export const getSearchHot=async(_id)=>{
    const data =await Search.find({})
    return data
}

