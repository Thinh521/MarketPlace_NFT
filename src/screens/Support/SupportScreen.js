import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Linking,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  DiscordIcon,
  FileIcon,
  PaletteIcon,
  RocketIcon,
  SettingIcon,
  ShieldIcon,
  ShoppingIcon,
  TwitterIcon,
} from '~/assets/icons/icons';

import {Button} from '~/components/ui/Button';

import {Colors} from '~/theme/theme';
import {scale} from '~/utils/scaling';
import styles from './Support.styles';

const SupportScreen = () => {
  const navigation = useNavigation();
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const supportCategories = [
    {
      id: 1,
      icon: <RocketIcon style={{width: scale(28), height: scale(28)}} />,
      title: 'Getting Started',
      description: 'Learn the basics and get your journey',
    },
    {
      id: 2,
      icon: <ShieldIcon style={{width: scale(28), height: scale(28)}} />,
      title: 'Account & Security',
      description: 'Protect your account and ensure safety',
    },
    {
      id: 3,
      icon: <FileIcon style={{width: scale(28), height: scale(28)}} />,
      title: 'Transactions',
      description: 'Understanding gas fees and transactions',
    },
    {
      id: 4,
      icon: <PaletteIcon style={{width: scale(28), height: scale(28)}} />,
      title: 'Creating & Minting',
      description: 'Create and mint your digital assets',
    },
    {
      id: 5,
      icon: <ShoppingIcon style={{width: scale(28), height: scale(28)}} />,
      title: 'Buying & Selling',
      description: 'How to buy and sell your NFTs',
    },
    {
      id: 6,
      icon: <SettingIcon style={{width: scale(28), height: scale(28)}} />,
      title: 'Technical Support',
      description: 'Troubleshooting technical issues',
    },
  ];

  const faqs = [
    {
      id: 1,
      question: 'How do I create an account?',
      answer:
        'To create an account, click on the "Sign Up" button in the top right corner. Fill in your email, create a password, and verify your email address. You can also sign up using your wallet connection.',
    },
    {
      id: 2,
      question: 'What are gas fees and why do I need to pay them?',
      answer:
        'Gas fees are transaction fees paid to blockchain miners for processing your transaction. These fees vary based on network congestion and are required for any blockchain operation like minting or transferring NFTs.',
    },
    {
      id: 3,
      question: 'How do I connect a wallet for transfers?',
      answer:
        'Click on the wallet icon in the top navigation, select your preferred wallet provider (MetaMask, WalletConnect, etc.), and follow the connection prompts. Make sure you have the wallet extension installed in your browser.',
    },
    {
      id: 4,
      question: 'Is my wallet secure on this platform?',
      answer:
        "Yes, we use industry-standard security practices. Your wallet connection is encrypted, and we never store your private keys. Always ensure you're on the official website and never share your seed phrase with anyone.",
    },
    {
      id: 5,
      question: "Can I customize or modify my listing after it's live?",
      answer:
        'Yes, you can edit your listing price, description, and other details at any time. However, some blockchain-based properties like token metadata may be immutable depending on your settings during creation.',
    },
  ];

  const toggleFAQ = id => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const handleCategoryPress = category => {
    navigation.navigate('CategoryDetail', {category});
  };

  const openSocialLink = url => {
    Linking.openURL(url).catch(err =>
      console.error('Failed to open URL:', err),
    );
  };

  return (
    <LinearGradient
      colors={['#111827', '#001656', '#0F1026']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.gradientBackground}>
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={Colors.background}
          barStyle="light-content"
          translucent={false}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          {/* Support Categories */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>SUPPORT CATEGORIES</Text>
            <View style={styles.categoriesGrid}>
              {supportCategories.map(category => (
                <TouchableOpacity
                  key={category.id}
                  style={styles.categoryCard}
                  onPress={() => handleCategoryPress(category)}
                  activeOpacity={0.8}>
                  <View
                    style={[
                      styles.categoryIconContainer,
                      {backgroundColor: `${category.color}20`},
                    ]}>
                    {category.icon}
                  </View>
                  <Text style={styles.categoryTitle}>{category.title}</Text>
                  <Text style={styles.categoryDescription}>
                    {category.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View
            style={{
              borderBottomWidth: 1,
              borderBlockColor: Colors.border,
              marginHorizontal: scale(20),
            }}
          />

          {/* FAQ Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>FREQUENTLY ASKED QUESTIONS</Text>
            <View style={styles.faqList}>
              {faqs.map(faq => (
                <View key={faq.id} style={styles.faqItem}>
                  <TouchableOpacity
                    style={styles.faqQuestion}
                    onPress={() => toggleFAQ(faq.id)}
                    activeOpacity={0.7}>
                    <Text style={styles.faqQuestionText}>{faq.question}</Text>
                    <Icon
                      name={
                        expandedFAQ === faq.id ? 'chevron-up' : 'chevron-down'
                      }
                      size={scale(20)}
                      color={Colors.white}
                    />
                  </TouchableOpacity>
                  {expandedFAQ === faq.id && (
                    <View style={styles.faqAnswer}>
                      <Text style={styles.faqAnswerText}>{faq.answer}</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>

          <View
            style={{
              borderBottomWidth: 1,
              borderBlockColor: Colors.border,
              marginHorizontal: scale(20),
            }}
          />

          {/* Still Need Help Section */}
          <View style={styles.helpSection}>
            <Text style={[styles.sectionTitle, {marginBottom: scale(10)}]}>
              STILL NEED HELP?
            </Text>
            <Text style={styles.helpSubtitle}>
              We couldn't find an answer? Please feel free to contact with our
              team via support ticket
            </Text>

            <Button.Main
              title="SUBMIT A SUPPORT TICKET"
              style={styles.ticketButton}
              useGradient
            />

            <Text style={[styles.helpSubtitle, {marginBottom: 26}]}>
              Or join our community for instant help:
            </Text>

            {/* Social Links */}
            <View style={styles.socialLinks}>
              <Button.Icon
                icon={<DiscordIcon />}
                onPress={() => openSocialLink('https://discord.com')}
                style={styles.socialButton}
              />
              <Button.Icon
                icon={<TwitterIcon />}
                onPress={() => openSocialLink('https://twitter.com')}
                style={styles.socialButton}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SupportScreen;
