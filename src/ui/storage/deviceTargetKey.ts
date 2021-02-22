/*
  We want to persist configurations between very closely related targets, for example:

    * DeviceTarget.Frsky_TX_R9M_via_STLINK
    * DeviceTarget.Frsky_TX_R9M_via_stock_BL
    * DeviceTarget.Frsky_TX_R9M_via_WIFI

  This is essentially the same device that we targeting.
 */
import { DeviceTarget } from '../gql/generated/types';

const deviceTargetKey = (target: DeviceTarget): DeviceTarget => {
  switch (target) {
    case DeviceTarget.Frsky_TX_R9M_via_STLINK:
    case DeviceTarget.Frsky_TX_R9M_via_stock_BL:
    case DeviceTarget.Frsky_TX_R9M_via_WIFI:
      return DeviceTarget.Frsky_TX_R9M_via_STLINK;
    case DeviceTarget.Frsky_TX_R9M_LITE_via_STLINK:
    case DeviceTarget.Frsky_TX_R9M_LITE_via_stock_BL:
      return DeviceTarget.Frsky_TX_R9M_LITE_via_STLINK;
    case DeviceTarget.Frsky_RX_R9MM_R9MINI_via_STLINK:
    case DeviceTarget.Frsky_RX_R9MM_R9MINI_via_BetaflightPassthrough:
      return DeviceTarget.Frsky_RX_R9MM_R9MINI_via_STLINK;
    case DeviceTarget.Frsky_RX_R9SLIMPLUS_via_STLINK:
    case DeviceTarget.Frsky_RX_R9SLIMPLUS_via_BetaflightPassthrough:
      return DeviceTarget.Frsky_RX_R9SLIMPLUS_via_STLINK;
    case DeviceTarget.Frsky_RX_R9SLIMPLUS_OTA_via_STLINK:
    case DeviceTarget.Frsky_RX_R9SLIMPLUS_OTA_via_BetaflightPassthrough:
      return DeviceTarget.Frsky_RX_R9SLIMPLUS_OTA_via_STLINK;
    case DeviceTarget.Frsky_RX_R9MX_via_STLINK:
    case DeviceTarget.Frsky_RX_R9MX_via_BetaflightPassthrough:
      return DeviceTarget.Frsky_RX_R9MX_via_STLINK;
    case DeviceTarget.Jumper_RX_R900MINI_via_STLINK:
    case DeviceTarget.Jumper_RX_R900MINI_via_BetaflightPassthrough:
      return DeviceTarget.Jumper_RX_R900MINI_via_STLINK;
    case DeviceTarget.DIY_900_RX_ESP8285_SX127x_via_UART:
    case DeviceTarget.DIY_900_RX_ESP8285_SX127x_via_BetaflightPassthrough:
      return DeviceTarget.DIY_900_RX_ESP8285_SX127x_via_UART;
    case DeviceTarget.GHOST_ATTO_2400_RX_via_STLINK:
    case DeviceTarget.GHOST_ATTO_2400_RX_via_BetaflightPassthrough:
      return DeviceTarget.GHOST_ATTO_2400_RX_via_STLINK;
    case DeviceTarget.DIY_2400_RX_ESP8285_SX1280_via_UART:
    case DeviceTarget.DIY_2400_RX_ESP8285_SX1280_via_BetaflightPassthrough:
      return DeviceTarget.DIY_2400_RX_ESP8285_SX1280_via_UART;
    case DeviceTarget.DIY_2400_RX_STM32_CCG_Nano_v0_5:
    case DeviceTarget.DIY_2400_RX_STM32_CCG_Nano_v0_5_via_BetaflightPassthrough:
      return DeviceTarget.DIY_2400_RX_STM32_CCG_Nano_v0_5;
    default:
      return target;
  }
};

export default deviceTargetKey;