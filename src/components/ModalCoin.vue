<template>
  <Modal
    v-model="visible"
    class-name="modal-coinCoin"
    :closable="false"
    :mask-closable="false"
  >
    <img src="../assets/images/intro-white-close.png"
         @click="handleCancel"
         class="modal-coinCoin-close">
    <p class="modal-coinCoin-top">
      <img src="../assets/images/intro-wait.png">
    </p>
    <p class="modal-coinCoin-text-main">{{ $t('introT.coinCoinMainTxt') }}</p>
    <p class="modal-coinCoin-text-sub">{{ $t('introT.coinCoinSubTxt') }}</p>
    <div slot="footer">
      <Button type="primary" @click="handleCancel">
        {{ $t('introT.iKnow') }}
      </Button>
    </div>
  </Modal>
</template>

<script>
export default {
  name: 'modal-coin',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      visible: this.value,
    };
  },
  methods: {
    handleCancel() {
      this.visible = false;
      this.$emit('input', false);
    },
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },
};
</script>

<style lang="less">
  .modal-coinCoin {
    text-align: center;
    color: #fff;
    .ivu-modal-content{
      background: #2E435F;
      .modal-coinCoin-close {
        cursor: pointer;
        position: absolute;
        width: 14px;
        right: 30px;
        top: 30px;
      }
      .modal-coinCoin-top {
        margin-top: 30px;
        img {
          width: 29px;
        }
      }
      .modal-coinCoin-text-main{
        font-size: 20px;
        margin-top: 10px;
        margin-bottom: 14px;
        line-height: 33px;
      }
      .ivu-modal-footer{
        margin: 10px 0;
        text-align: center;
      }
    }
  }
</style>
