
module.exports = {
	responseError(res,error){
		res.json({
			status:'1',
			msg:error.message,
		})
	},
	responseSuccess(res,data){
		res.json({
			status:'0',
			msg:'success',
			result:data
		})
	}
}