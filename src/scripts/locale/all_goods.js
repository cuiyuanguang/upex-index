var messages = {
  welcome: {
    zh: '欢迎光临',
    en: 'Welcome',
    ar: 'مرحباً بك',
  },
  releaseAdvert: {
    zh: '发布挂单',
    en: 'Release pending order',
    ar: 'نشر طلب',
  },
  notSatisfied: {
    zh: '对市场价不满意',
    en: 'Market price is not satisfied?',
    ar: 'سعر السوق غير مرضية؟',
  },
  dealOrderBeforeRelease: {
    zh: '请处理完现有订单再发布',
    en: 'please deal with your current order before releasing',
    ar: 'يرجى معالجة الطلب الحالي ومن ثم النشر',
  },
  releaseBuyOnly: {
    zh: '卖单发布已达上限，只能发布买单',
    en: 'Sell order reached the upper limit, you can only release buy order',
    ar: 'نشرطلب البيع وصل إلى الحد الأقصى ، يمكنك فقط نشر طلب الشراء',
  },
  releaseSellOnly: {
    zh: '买单发布已达上限，只能发布卖单',
    en: 'Buy order reached the upper limit, you can only release sell order',
    ar: 'نشرطلب الشراء وصل إلى الحد الأقصى ، يمكنك فقط نشر طلب البيع',
  },
  sell: {
    zh: '卖出',
    en: 'Sell',
    ar: 'بيع',
  },
  buy: {
    zh: '买入',
    en: 'Buy',
    ar: 'شراء',
  },
  seller: {
    zh: '卖家',
    en: 'Seller',
    ar: 'البائع',
  },
  buyer: {
    zh: '买家',
    en: 'Buyer',
    ar: 'المشتري',
  },
  mine: {
    zh: '我的',
    en: 'Mine',
    ar: 'الخاص بي',
  },
  amount: {
    zh: '数量',
    en: 'Amount',
    ar: 'المبلغ',
  },
  limit: {
    zh: '限额',
    en: 'limit amount',
    ar: 'الكمية المحددة',
  },
  min2maxPurchase: {
    zh: '最小-最大购买额',
    en: 'Min and Max purchase amount ',
    ar: 'الحد الأدنى والأقصى لمبلغ الشراء',
  },
  unitPrice: {
    zh: '单价',
    en: 'Unit Price',
    ar: 'سعر الوحدة',
  },
  payment: {
    zh: '支付方式',
    en: 'Payment method',
    ar: 'طريقة الدفع',
  },
  operation: {
    zh: '操作',
    en: 'Operation',
    ar: 'إجراء العملية',
  },
  cancel: {
    zh: '取消',
    en: 'Cancel',
    ar: 'إلغاء',
  },
  start: {
    zh: '开始接单',
    en: 'Start receiving orders',
    ar: 'بدء باستقبال الطلبات',
  },
  pause: {
    zh: '暂停接单',
    en: 'suspend receiving orders',
    ar: 'وقف استقبال الطلبات',
  },
  currentPrice: {
    zh: '当前市场价',
    en: 'Current market price',
    ar: 'سعر السوق الحالي',
  },
  currentReleasePrice: {
    zh: '当前发布价',
    en: 'Current release price',
    ar: 'سعر النشر الحالي',
  },
  pricePlaceholder: {
    zh: '请输入您的期望价格',
    en: 'Please enter your expected price',
    ar: 'يرجى إدخال السعر المتوقع',
  },
  quantity: {
    zh: '数量',
    en: 'Quantity',
    ar: 'الكمية',
  },
  balance: {
    zh: '余额',
    en: 'Balance',
    ar: 'الرصيد',
  },
  amountPlaceholder: {
    zh: '请输入交易数量',
    en: 'Please enter the transaction quantity',
    ar: 'يرجى إدخال كمية الصفقة',
  },
  totalPrice: {
    zh: '总价',
    en: 'total price',
    ar: 'السعر الإجمالي',
  },
  transactionLimit: {
    zh: '单笔限额',
    en: 'Single transaction limit amount',
    ar: 'المبلغ المحدد للصفقة الواحدة',
  },
  deviationWarn: {
    zh: '价格波动提示',
    en: 'Price fluctuation prompt',
    ar: 'تحذير تقلب الأسعار',
  },
  moreThan50Percent: {
    zh: '挂单价格大于市价50%，可能给您带来损失！',
    en: 'Pending order price is 50% higher than the market price, which may cause you losses!',
    ar: 'سعر الطلب أعلى بنسبة 50٪ من سعر السوق ، ربما قد تجلب لك الخسائر!',
  },
  lessThan50Percent: {
    zh: '挂单价格小于市价50%，可能给您带来损失！',
    en: 'Pending order price is 50% less than the market price, which may cause you losses!',
    ar: 'سعر الطلب أقل بنسبة 50٪ من سعر السوق ، ربما قد تجلب لك الخسائر!',
  },
  lessThanHighestPurchase: {
    zh: '挂单价格低于市场最高买价，可能给您带来损失！',
    en:
      'Pending order price is less than the highest purchasing price in the market, which may cause you losses',
    ar: 'سعر الطلب أقل من أعلى سعر شراء في السوق ، ربما قد تجلب لك الخسائر!',
  },
  moreThanLowestPrice: {
    zh: '挂单价格高于市场最低卖价，可能给您带来损失！',
    en:
      'Pending order price is higher than the lowest selling price in the market, which may cause you losses!',
    ar: 'سعر الطلب أعلى من أدنى سعر بيع في السوق ، ربما قد تجلب لك الخسائر!',
  },
  confirmRelease: {
    zh: '确认发布',
    en: 'Confirm release',
    ar: 'تأكيد النشر',
  },
  modifyNow: {
    zh: '立即修改',
    en: 'Modify now',
    ar: 'تعديل الآن',
  },
  moreSetting: {
    zh: '更多设置',
    en: 'More settings',
    ar: 'المزيد من الإعدادات',
  },
  bankCard: {
    zh: '银行卡',
    en: 'bank card',
    ar: 'بطاقة البنك',
  },
  googleAuthCode: {
    zh: '谷歌验证码',
    en: 'Google verification code',
    ar: 'رمز التحقق من الجوجل',
  },
  smsCode: {
    zh: '短信验证码',
    en: 'SMS verification code',
    ar: 'رمز التحقق من الرسالة',
  },
  backEdit: {
    zh: '返回修改',
    en: 'back to edit',
    ar: 'عودة للتعديل',
  },
  noData: {
    zh: '暂无数据',
    en: 'No Data',
    ar: 'لايوجد بيانات',
  },
  noEmpty: {
    zh: '不能为空',
    en: 'can not be empty',
    ar: 'لا يمكن أن تكون فارغة',
  },
  maxNoLessThanMin: {
    zh: '最大限额不能小于最小限额',
    en: 'Max limit can not be less than the Min limit amount',
    ar: 'الحد الأقصى لا يمكن أن يكون أقل من الحد الأدنى للمبلغ',
  },
  maxNoMoreThanTotal: {
    zh: '最大限额不能大于总价',
    en: 'Max limit amount can not be bigger than the total price',
    ar: 'الحد الأقصى للمبلغ لا يمكن أن يكون أعلى من السعر الإجمالي',
  },
  verifyNoEmpty: {
    zh: '验证码不能为空！',
    en: ' verification code can not be empty',
    ar: 'رمز التحقق لا يمكن أن يكون فارغًا',
  },
  atLeastOneBank: {
    zh: '至少选择一张银行卡',
    en: 'chose one bank card at least',
    ar: 'اختر بطاقة بنك واحدة على الأقل',
  },
  buyInputLimit: {
    zh: '输入限制为：',
    en: 'the input limit is:',
    ar: 'المحددة للإدخال هي:',
  },
};
