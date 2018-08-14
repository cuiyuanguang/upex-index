var messages = {
  waitForBuyer: {
    zh: '等待买家付款',
    en: 'Waiting for buyer to pay',
    ar: 'في انتظار دفع المشتري',
  },
  buyerPaid: {
    zh: '买家已支付',
    en: 'Buyer has paid',
    ar: 'تم دفع المشتري',
  },
  transactionSuccessful: {
    zh: '交易成功',
    en: 'transaction succeeded',
    ar: 'تم الصفقة',
  },
  receivePayment: {
    zh: '收到法币',
    en: ' currency received',
    ar: 'تم استلام العملة',
  },
  orderSuccess: {
    zh: '下单成功',
    en: 'order succeeded',
    ar: 'تم الطلب',
  },
  payAndConfirm: {
    zh: '确认支付',
    en: 'Confirm payment',
    ar: 'تأكيد الدفع',
  },
  tradeDone: {
    zh: '交易完成',
    en: 'Transaction completed',
    ar: 'تم الصفقة',
  },
  hour: {
    zh: '小时',
    en: 'hour',
    ar: 'ساعة',
  },
  restTime: {
    zh: '剩余时间',
    en: 'remaining time',
    ar: 'الوقت المتبقي',
  },
  waitForTime: {
    zh: '交易截止时间',
    en: 'transaction deadline',
    ar: 'الموعد النهائي للصفقة',
  },
  orderInfo: {
    zh: '订单信息',
    en: 'Order Informations',
    ar: 'معلومات الطلب',
  },
  orderNo: {
    zh: '订单编号',
    en: 'Order Number',
    ar: 'رقم الطلب',
  },
  totalPurchase: {
    zh: '购买总量',
    en: 'Total purchase',
    ar: 'إجمالي الشراء',
  },
  totalPrice: {
    zh: '支付金额',
    en: 'Payment amount',
    ar: 'مبلغ الدفع',
  },
  received: {
    zh: '收到',
    en: 'Received',
    ar: 'تم الاستلام',
  },
  sold: {
    zh: '出售',
    en: 'sold',
    ar: 'تم البيع',
  },
  timeOfArrival: {
    zh: '到账时间',
    en: 'Time of arrival to the account',
    ar: 'وقت الوصول الى الحساب',
  },
  buyInfo: {
    zh: '买家信息',
    en: 'Buyer Informations',
    ar: 'معلومات المشتري',
  },
  buyName: {
    zh: '买家昵称',
    en: 'Buyer nickname',
    ar: 'لقب المشتري',
  },
  phone: {
    zh: '手机号',
    en: 'phone number',
    ar: 'رقم الهاتف',
  },
  socialNumber: {
    zh: '社交账号',
    en: 'social number',
    ar: 'الحساب الاجتماعي',
  },
  contactBuyer: {
    zh: '联系买家',
    en: 'Contact the buyer',
    ar: 'الاتصال بالمشتري',
  },
  backToHome: {
    zh: '返回主页',
    en: 'back to homepage',
    ar: 'العودة إلى الصفحة الرئيسية',
  },
  helpTipsFirst: {
    zh: '到账时间受不可抗力因素如跨行，大额转账影响，且银行系统并不受买方或卖方控制，请耐心等待。',
    en:
      'Due to cross-bank services or large amounts transfer or other reasons caused delay in arrival time,is out of  seller or buyer control, so please wait patiently',
    ar: 'بسبب الخدمات المصرفية بين البنوك المختلفة أو دفع المبالغ الكبيرة أوعوامل أخرى تسبب في تأخير وقت وصول المبلغ الى الحساب، هو خارج عن نطاق سيطرة البائع والمشتري ، لذلك يرجى الانتظار بالصبر',
  },
  helpTipsSecond: {
    zh: '如当天取消订单次数达到三次，支付功能将会被锁定。',
    en: 'If order cancellation reached three times in the same day, the payment function will be closed',
    ar: 'إذا بلغ إلغاء الطلب ثلاث مرات في نفس اليوم ، فسيتم إغلاق وظيفة الدفع',
  },
  helpTipsThird: {
    zh: '如您24小时内未收到法币或法币金额不正确，请联系客服',
    en:
      'If you do not receive the currency or the amount of the currency is incorrect within 24 hours, please contact customer service',
    ar: 'إذا لم يتم استلام العملة أو مبلغ العملة غير صحيح خلال 24 ساعة ، يرجى الاتصال بخدمة العملاء',
  },
  helpTipsFourth: {
    zh: '若订单超时未处理，客服将会介入协助交易。',
    en: 'If order timeout is not processed，the customer service will be involved in assisting to complete the transaction',
    ar: 'إذا نفذ الوقت لم يتم معالجة الطلب ، سوف تتدخل خدمة العملاء للمساعدة في إتمام الصفقة',
  },
  cancel: {
    zh: '取消',
    en: 'cancel',
    ar: 'إلغاء',
  },
  lastFourNumber: {
    zh: '支付卡号后四位为',
    en: 'The last four numbers of the payment card are',
    ar: 'اَخر اربعة أرقام من بطاقة الدفع هي',
  },
  payYou: {
    zh: '向您支付',
    en: 'pay to you',
    ar: 'تدفع لك',
  },
  confirmReceive: {
    zh: '确认收款',
    en: 'confirm receipt',
    ar: 'تأكيد الاستلام',
  },
  receiveAll: {
    zh: '是否收到全额法币？',
    en: 'Have you received the full amount of the currency?',
    ar: 'هل استلمت المبلغ الكامل للعملة ؟',
  },
  notReceiveAndWait: {
    zh: '若未收到，请耐心等待。',
    en: 'If not received, please wait patiently',
    ar: 'إذا لم يتم الاستلام، يرجى الانتظار بصبر',
  },
  confirm: {
    zh: '确认',
    en: 'confirm',
    ar: 'تأكيد',
  },
  orderExpired: {
    zh: '订单过期',
    en: 'order expired',
    ar: 'انتهت صلاحية الطلب',
  },
  copied: {
    zh: '已复制',
    en: 'has been copied',
    ar: 'تم النسخ',
  },
  orderExpiredTips: {
    zh: '订单已过期，无法查看信息',
    en: 'Order expired, unable to view information!',
    ar: 'انتهت صلاحية الطلب ، غير قادر على عرض المعلومات',
  },
  orderCanceled: {
    zh: '订单已取消',
    en: 'order canceled',
    ar: 'تم إلغاء الطلب',
  },
  orderCanceledTips: {
    zh: '订单已取消，无法继续操作',
    en: 'Order canceled, unable to operate!',
    ar: 'أجل ألغيت ، لا مزيد من العملية',
  },
  reasonForFailure: {
    zh: '失败原因',
    en: 'reason for failure',
    ar: 'سبب الفشل',
  },
  outOfTimeToPay: {
    zh: '买家超时未付款',
    en: 'Buyer has not paid for overtime',
    ar: 'لم يدفع المشتري مقابل العمل الإضافي',
  },
  outOfTimeToConfirm: {
    zh: '卖家超时未确认',
    en: 'Seller has not confirmed for overtime',
    ar: 'البائع انتهت مهلة غير مؤكدة',
  },
};
