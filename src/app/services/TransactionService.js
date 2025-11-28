import AdCampaignTransaction from "../models/AdCampaignTransaction.js";

class TransactionService {
    createTransaction(data) {
        return AdCampaignTransaction.create(data);
    }

    getTransactionById(id) {
        return AdCampaignTransaction.findByPk(id);
    }
}

export default new TransactionService();