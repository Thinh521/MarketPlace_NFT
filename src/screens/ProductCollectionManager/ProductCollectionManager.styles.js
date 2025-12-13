import {StyleSheet} from 'react-native';
import {Colors, FontSizes, FontWeights} from '~/theme/theme';
import {scale} from '~/utils/scaling';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: scale(40),
  },

  // Content
  content: {
    paddingHorizontal: scale(16),
    paddingTop: scale(24),
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(24),
    paddingHorizontal: scale(4),
  },
  headerTitle: {
    color: Colors.white,
    fontSize: FontSizes.large,
    fontWeight: FontWeights.bold,
    flex: 1,
  },
  deleteButton: {
    width: scale(44),
    height: scale(44),
    backgroundColor: 'rgba(255,0,107,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,0,107,0.3)',
    borderRadius: scale(22),
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Upload Section
  uploadSection: {
    backgroundColor: Colors.deepBackground,
    borderWidth: 2,
    borderColor: Colors.border,
    borderStyle: 'dashed',
    borderRadius: scale(12),
    padding: scale(32),
    alignItems: 'center',
    marginBottom: scale(32),
    minHeight: scale(280),
    justifyContent: 'center',
  },
  uploadIcon: {
    width: scale(80),
    height: scale(80),
    backgroundColor: 'rgba(0,217,255,0.1)',
    borderRadius: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scale(16),
  },
  uploadTitle: {
    color: Colors.white,
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.semiBold,
    marginBottom: scale(4),
  },
  uploadSubtitle: {
    color: Colors.textHighlight,
    fontSize: FontSizes.small,
    marginBottom: scale(16),
  },
  imagePreviewContainer: {
    width: '100%',
    borderRadius: scale(12),
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.deepBackground,
    minHeight: scale(250),
  },
  previewImage: {
    width: '100%',
    height: scale(250),
    borderRadius: scale(12),
  },
  removeImageButton: {
    position: 'absolute',
    top: scale(8),
    right: scale(8),
    zIndex: 10,
    backgroundColor: Colors.redColor,
    width: scale(28),
    height: scale(28),
    borderRadius: scale(14),
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImageWrapper: {
    gap: scale(6),
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  uploadedImageSize: {
    color: Colors.textHighlight,
    fontSize: FontSizes.small,
  },
  supportedFormats: {
    marginBottom: scale(20),
  },
  supportedFormatsText: {
    color: Colors.textHighlight,
    fontSize: FontSizes.small,
    lineHeight: 20,
    textAlign: 'center',
  },
  chooseFileButton: {
    width: scale(150),
    borderRadius: 0,
  },
  chooseFileText: {
    color: Colors.white,
  },
  uploadedImageText: {
    color: Colors.primary,
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.semiBold,
    marginBottom: scale(8),
  },

  // Section
  section: {
    marginBottom: scale(24),
  },
  sectionHeader: {
    marginBottom: scale(16),
  },

  // Form Group
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
    marginBottom: scale(8),
  },
  textArea: {
    minHeight: scale(120),
    color: Colors.white,
    fontSize: FontSizes.small,
  },
  hint: {
    color: Colors.textHighlight,
    fontSize: FontSizes.small,
    lineHeight: 22,
  },

  // Info Section
  infoSection: {
    backgroundColor: Colors.deepBackground,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: scale(12),
    padding: scale(16),
    marginBottom: scale(24),
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scale(8),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  infoLabel: {
    color: Colors.textHighlight,
    fontSize: FontSizes.small,
    fontWeight: FontWeights.medium,
  },
  infoValue: {
    color: Colors.white,
    fontSize: FontSizes.small,
    fontWeight: FontWeights.semiBold,
  },

  // Button Container
  buttonContainer: {
    padding: scale(16),
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.background,
  },

  // Error Text
  errorText: {
    color: Colors.redColor,
    fontSize: FontSizes.small,
    fontWeight: FontWeights.medium,
    marginTop: scale(4),
  },
});
