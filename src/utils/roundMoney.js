export const roundMoney = (amount) => {
    return Math.round((amount + Number.EPSILON) * 100) / 100;
};
