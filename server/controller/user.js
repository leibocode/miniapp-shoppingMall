import config from '../config'
import mongoose from 'mongoose'
import {
    openidAndSessionKey,
    WXBizDataCrypt
} from '../wechat/minapp'

const user =mongoose.model('User')

export const decryptUserAsync =async(code,userInfo)=>{
    
}

export async function getUserAsync(ctx,next){

}

export async function loginAsync(ctx,next) {

}