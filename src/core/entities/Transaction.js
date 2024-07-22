class Transaction {
    constructor(transaction_id, user_id, fund_id, amount, type, date) {
        this.transaction_id = transaction_id;
        this.user_id = user_id;
        this.fund_id = fund_id;
        this.amount = amount;
        this.type = type;
        this.date = date;
    }
}

export default Transaction;
