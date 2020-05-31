const MD5 = require('md5.js');

function WipayTransaction (transaction) {
	
	const transactionCopy = Object.assign(
		{}, 
		transaction, 
		{ 
			orderId: transaction.order_id, 
			transactionId: transaction.transaction_id, 
			currency: transaction.D
		}
	)
		
	const {
		status, 
		name, 
		email, 
		hash, 
		orderId, 
		transactionId, 
		reasonCode, 
		reasonDescription, 
		responseCode, 
		total, 
		currency
	} = transactionCopy

	return {

		isSuccessful: status === 'success',

		verifyHash: (merchantKey) => {
			const genertedHash = new MD5().update(orderId+total+merchantKey).digest('hex');
			return genertedHash === hash
		},

		status, 
		name, 
		email, 
		hash, 
		orderId, 
		transactionId, 
		reasonCode, 
		reasonDescription, 
		responseCode, 
		total, 
		currency
	}
		
}

module.exports = WipayTransaction