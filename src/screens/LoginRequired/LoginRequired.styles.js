import {StyleSheet} from 'react-native';
import {Colors, FontSizes, FontWeights} from '~/theme/theme';
import {scale} from '~/utils/scaling';

export default StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(24),
    paddingVertical: scale(40),
  },
  logoContainer: {
    marginBottom: scale(10),
  },
  logo: {
    width: scale(50),
    height: scale(50),
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: scale(12),
  },
  nameApp: {
    color: Colors.white,
    fontSize: FontSizes.xxlarge,
    fontWeight: FontWeights.extraBold,
    marginBottom: scale(40),
    letterSpacing: 1,
  },
  taglineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taglineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
    paddingHorizontal: scale(12),
    paddingVertical: scale(6),
    borderRadius: scale(20),
    backgroundColor: 'rgba(1, 197, 186, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(1, 197, 186, 0.3)',
  },
  taglineText: {
    fontSize: FontSizes.small,
    fontWeight: FontWeights.semiBold,
    color: Colors.primary,
    letterSpacing: 0.5,
  },
  descriptionContainer: {
    marginBottom: scale(32),
  },
  description: {
    textAlign: 'center',
    color: Colors.textGray,
    fontSize: FontSizes.medium,
    paddingHorizontal: scale(16),
    lineHeight: 22,
    opacity: 0.8,
  },
  illustrationContainer: {
    marginBottom: scale(32),
  },
  illustration: {
    width: scale(300),
    height: scale(220),
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  connectButton: {
    shadowColor: Colors.primary,
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
    marginBottom: scale(6),
  },
  supportedWallets: {
    fontSize: FontSizes.small,
    color: Colors.textGray,
    marginTop: scale(12),
    textAlign: 'center',
    opacity: 0.7,
  },
  footerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
    marginTop: scale(24),
    paddingHorizontal: scale(16),
    paddingVertical: scale(10),
    borderRadius: scale(10),
    backgroundColor: Colors.overlayLight,
    borderWidth: 1,
    borderColor: Colors.borderLightTransparent,
  },
  walletIcon: {
    width: scale(20),
    height: scale(20),
  },
  informationIcon: {
    width: scale(18),
    height: scale(18),
    color: Colors.textGray,
    opacity: 0.8,
  },
  footerText: {
    fontSize: FontSizes.small,
    color: Colors.textGray,
    opacity: 0.8,
  },
});
