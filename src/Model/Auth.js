class Auth{

	Userlogin(data){

		return new Promise((resolve,reject)=>{

			setTimeout(()=>{
			 
			  if(data.email == "user@demo.com"){
			    
			  	resolve(true);
			  }else{
			  	
			  	reject(new Error('Wrong Username, Email or Password'));
			  }

			},2000)
		});

	}


	Businesslogin(data){

		return new Promise((resolve,reject)=>{

			setTimeout(()=>{
			 
			  if(data.email == "company@demo.com"){
			    
			  	resolve(true);
			  }else{
			  	
			  	reject(new Error('Wrong Username, Email or Password'));
			  }

			},2000)
		});

	}


}

export default new Auth;