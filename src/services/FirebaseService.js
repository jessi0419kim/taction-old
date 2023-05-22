import { db } from 'auth/FirebaseAuth';
import md5 from 'md5'



const FirebaseService = {}

FirebaseService.dbCreateAccount = async (walletAddress, walletType) => {
		 await db.collection("users").doc(walletAddress).set({
													 walletAddress: walletAddress,
			 										 walletType: walletType,
													 name: 'No Name',
													 country: '',
													 gender: '',
													 division:'',
													 rankingPoint: '1500',
													 role: 'User',
													 team: '',
													 profileImage: `http://gravatar.com/avatar/${md5(walletAddress)}?d=identicon`,
													 }).catch(function(error) {
													   console.error("Error adding document: ", error);
													 });
											};

FirebaseService.dbGetAccount = async (walletAddress) => 
   await db.collection("users").doc(walletAddress).get().then((doc) => {
      // console.log("Current data: ", doc.data());
	return doc.data()
    });

FirebaseService.dbUpdateUserInfo = async (walletAddress, name, country, division, team) => {
		 await db.collection("users").doc(walletAddress).update({
												    name: name,
			 										country:country,
			 										division: division,
			 										team : team
												 }).catch(function(error) {
												 console.error("Error adding document: ", error);
												 });
											};

// FirebaseService.dbGetAccount = async walletAddress => 
// 	await db.collection("users").doc(walletAddress).onSnapshot((doc) => {
// 	console.log(doc.data())
//        return doc.data()
//     });
		

// FirebaseService.signOutRequest = async () =>
// 	await auth.signOut().then(user => user).catch(err => err);




	
export default FirebaseService