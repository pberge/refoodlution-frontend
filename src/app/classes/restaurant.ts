import { SubscriptionPlan } from './subscription-plan.enum';
import { Serializable } from './serializable';

export class Restaurant extends Serializable {
    public id: number;
    public name: string;
    public address: string;
    public city: string;
    public zipCode: string;
    public country: string;
    public phone: string;
    public type: string;
    public companyName: string;
    public nif: string;
    public companyAddress: string;
    public promo: number;
    public subscriptionPlan: SubscriptionPlan;
    public subscriptionEnd: number;
    public isMonthly: boolean;
    public autoRenewal: boolean;
    public paymentType: number;
    public bankAccount: string;

    constructor() {
        super();
        this.name = '';
        this.address = '';
        this.city = '';
        this.zipCode = '';
        this.country = '';
        this.phone = '';
        this.type = '';
        this.companyName = '';
        this.nif = '';
        this.companyAddress = '';
        this.promo = null;
        this.subscriptionPlan = SubscriptionPlan.None;
        this.subscriptionEnd = 0;
        this.isMonthly = true;
        this.autoRenewal = false;
        this.paymentType = 0;
        this.bankAccount = '';
    }
}


