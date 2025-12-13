import {StyleSheet, Dimensions} from 'react-native';
import {Colors, FontSizes, FontWeights} from '~/theme/theme';
import {scale} from '~/utils/scaling';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContent: {
    paddingBottom: scale(40),
  },
  section: {
    paddingTop: scale(26),
    paddingHorizontal: scale(20),
    marginBottom: scale(26),
  },
  sectionTitle: {
    color: Colors.white,
    fontSize: FontSizes.semiLarge,
    fontWeight: FontWeights.extraBold,
    letterSpacing: 1,
    marginBottom: scale(20),
    textAlign: 'center',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(12),
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: (width - scale(40) - scale(12)) / 2,
    alignItems: 'center',
    borderWidth: 1,
    padding: scale(16),
    borderRadius: scale(16),
    backgroundColor: Colors.overlayLight,
    borderColor: Colors.borderLightTransparent,
  },
  categoryIconContainer: {
    width: scale(60),
    height: scale(60),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scale(6),
  },
  categoryTitle: {
    color: Colors.white,
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.bold,
    textAlign: 'center',
    marginBottom: scale(8),
    lineHeight: scale(18),
  },
  categoryDescription: {
    color: Colors.textHighlight,
    fontSize: FontSizes.small,
    textAlign: 'center',
    lineHeight: scale(16),
  },
  faqList: {
    gap: scale(12),
  },
  faqItem: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: scale(12),
    overflow: 'hidden',
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: scale(20),
  },
  faqQuestionText: {
    flex: 1,
    color: Colors.white,
    fontSize: FontSizes.small,
    fontWeight: FontWeights.bold,
    marginRight: scale(12),
    lineHeight: scale(22),
  },
  faqAnswer: {
    padding: scale(20),
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
  },
  faqAnswerText: {
    color: Colors.textHighlight,
    fontSize: FontSizes.small,
    lineHeight: 22,
  },
  helpSection: {
    marginTop: scale(26),
    paddingHorizontal: scale(20),
    alignItems: 'center',
  },
  helpSubtitle: {
    textAlign: 'center',
    color: Colors.textHighlight,
    fontSize: FontSizes.small,
    lineHeight: 22,
    marginBottom: scale(36),
    paddingHorizontal: scale(20),
  },
  ticketButton: {
    marginBottom: scale(24),
  },
  socialLinks: {
    flexDirection: 'row',
    gap: scale(16),
  },
  socialButton: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(24),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
});
