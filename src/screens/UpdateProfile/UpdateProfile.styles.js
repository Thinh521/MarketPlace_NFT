import {StyleSheet} from 'react-native';
import {scale} from '~/utils/scaling';
import {Colors, FontSizes, FontWeights} from '~/theme/theme';

export default StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContent: {
    paddingBottom: scale(140),
  },

  // Avatar Section
  avatarSection: {
    alignItems: 'center',
    paddingVertical: scale(32),
    paddingHorizontal: scale(20),
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: scale(12),
  },
  avatar: {
    width: scale(100),
    height: scale(100),
    borderRadius: 999,
    borderWidth: 3,
    borderColor: Colors.primary,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: -6,
    right: -6,
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#0F1026',
  },
  removeAvatarButton: {
    marginTop: scale(8),
    paddingVertical: scale(6),
    paddingHorizontal: scale(12),
  },
  removeAvatarText: {
    color: Colors.redColor,
    fontSize: FontSizes.small,
    fontWeight: FontWeights.bold,
  },
  avatarHint: {
    color: Colors.textHighlight,
    fontSize: FontSizes.small,
    textAlign: 'center',
    marginTop: scale(8),
  },

  // Form Section
  formSection: {
    paddingHorizontal: scale(16),
  },
  formGroup: {
    marginBottom: scale(24),
  },
  label: {
    color: Colors.white,
    fontSize: scale(14),
    fontWeight: FontWeights.semiBold,
    marginBottom: scale(8),
  },
  inputContainer: {
    marginBottom: 0,
  },
  textArea: {
    minHeight: scale(100),
  },
  characterCount: {
    color: Colors.textGray,
    fontSize: FontSizes.small,
    textAlign: 'right',
    marginTop: scale(4),
  },
  hint: {
    color: Colors.textGray,
    fontSize: FontSizes.small,
    marginTop: scale(4),
  },

  // Read Only Field
  readOnlyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
    borderRadius: scale(8),
    paddingVertical: scale(14),
    paddingHorizontal: scale(16),
    marginBottom: scale(8),
  },
  lockIcon: {
    marginRight: scale(10),
  },
  readOnlyText: {
    flex: 1,
    color: Colors.textGray,
    fontSize: FontSizes.small,
  },

  // Info Box
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(34, 211, 238, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(34, 211, 238, 0.3)',
    borderRadius: scale(12),
    padding: scale(16),
    marginHorizontal: scale(16),
    marginTop: scale(8),
    gap: scale(12),
  },
  infoText: {
    flex: 1,
    color: Colors.textGray,
    fontSize: FontSizes.small,
    lineHeight: 20,
  },

  // Buttons
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    gap: scale(12),
    padding: scale(16),
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.textGray,
    borderRadius: scale(8),
  },
  cancelButtonText: {
    color: Colors.white,
  },
  saveButton: {
    flex: 1,
    borderRadius: scale(8),
  },
  saveButtonText: {
    color: Colors.white,
  },

  // Loading Overlay
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  loadingText: {
    color: Colors.white,
    fontSize: FontSizes.regular,
    marginTop: scale(16),
  },
});
