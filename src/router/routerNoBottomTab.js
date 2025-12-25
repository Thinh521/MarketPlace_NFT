import {Colors} from '../theme/theme';
import ConnectWalletScreen from '../screens/ConnectWallet';
import NFTDetailScreen from '../screens/NFTDetail';
import NotificationScreen from '../screens/Notification';
import ProfileScreen from '../screens/Profile';
import SupportScreen from '../screens/Support';
import ProductPostingScreen from '../screens/ProductPosting';
import {getHeader} from '../navigation/getHeader';
import UpdateProfileScreen from '../screens/UpdateProfile';
import CreateUpdateNFTScreen from '../screens/CreateNFT';
import SettingScreen from '../screens/Setting';
import MakeOfferScreen from '../screens/MakeOffer';
import LoginRequiredScreen from '../screens/LoginRequired';
import SearchAndFilterScreen from '../screens/SearchAndFilter';
import AllProductsScreen from '../screens/AllProducts/AllProductsScreen';
import OnboardingScreen from '../screens/Onboarding';
import CollectionScreen from '../screens/Collection/CollectionScreen';
import CollectionManagerScreen from '../screens/Collection/CollectionManager';
import AddProductsToCollectionScreen from '../screens/Collection/AddProductsToCollection';
import AllCollectionsScreen from '../screens/Collection/AllCollections';
import PlaceBidScreen from '../screens/Auction/PlaceBid';
import AuctionDetailScreen from '../screens/Auction/AuctionDetail';

const routerNoBottomTab = [
  {
    name: 'Onboarding',
    component: OnboardingScreen,
    hasLayout: false,
    options: {
      title: 'Onboarding',
      headerTitleAlign: 'center',
      headerShown: false,
    },
  },
  {
    name: 'Notification',
    component: NotificationScreen,
    hasLayout: false,
    options: {
      title: 'Notification',
      headerTitleAlign: 'center',
      headerShown: true,
      headerStyle: {
        backgroundColor: Colors.background,
      },
      headerTitleStyle: {
        color: Colors.white,
      },
      headerTintColor: Colors.white,
      animation: 'slide_from_right',
    },
  },
  {
    name: 'Setting',
    component: SettingScreen,
    hasLayout: false,
    options: {
      title: 'Setting',
      headerTitleAlign: 'center',
      headerShown: true,
      headerStyle: {
        backgroundColor: Colors.background,
      },
      headerTitleStyle: {
        color: Colors.white,
      },
      headerTintColor: Colors.white,
    },
  },
  {
    name: 'NFTDetail',
    component: NFTDetailScreen,
    hasLayout: false,
    options: {
      title: 'NFT Detail',
      headerShown: false,
    },
  },
  {
    name: 'CreateUpdateNFT',
    component: CreateUpdateNFTScreen,
    options: getHeader({
      title: 'CREATE NEW ITEM',
      subTitle: 'Mint your digital masterpiece on the blockchain',
    }),
  },
  {
    name: 'Support',
    component: SupportScreen,
    hasLayout: false,
    options: {
      title: 'Support center',
      headerTitleAlign: 'center',
      headerShown: true,
      headerStyle: {
        backgroundColor: Colors.background,
      },
      headerTitleStyle: {
        color: Colors.white,
      },
      headerTintColor: Colors.white,
      animation: 'slide_from_right',
    },
  },
  {
    name: 'ConnectWallet',
    component: ConnectWalletScreen,
    hasLayout: false,
    options: {
      title: 'Connect wallet',
      headerTitleAlign: 'center',
      headerShown: true,
      headerStyle: {
        backgroundColor: Colors.background,
      },
      headerTitleStyle: {
        color: Colors.white,
      },
      headerTintColor: Colors.white,
      animation: 'slide_from_right',
    },
  },
  {
    name: 'LoginRequired',
    component: LoginRequiredScreen,
  },
  {
    name: 'ProductPosting',
    component: ProductPostingScreen,
    options: getHeader({
      title: 'LIST NFT FOR SALE',
      subTitle: 'Sell your NFT on the marketplace',
    }),
  },
  {
    name: 'Profile',
    component: ProfileScreen,
    hasLayout: false,
    options: {
      title: 'Create NFT',
      headerShown: false,
    },
  },
  {
    name: 'UpdateProfile',
    component: UpdateProfileScreen,
    options: getHeader({
      title: 'Update Profile',
      subTitle: 'Edit your profile information',
    }),
  },
  {
    name: 'CollectionManagerScreen',
    component: CollectionManagerScreen,
    options: getHeader({
      title: 'Product Collection Manager',
      subTitle: 'Create, edit, and delete your NFT collections',
    }),
  },
  {
    name: 'Collection',
    component: CollectionScreen,
  },
  {
    name: 'AddProductsToCollection',
    component: AddProductsToCollectionScreen,
    options: getHeader({
      title: 'Collection Manager',
      subTitle: 'Select NFTs to include in your collection',
    }),
  },
  {
    name: 'MakeOffer',
    component: MakeOfferScreen,
    options: getHeader({
      title: 'Create Auction',
    }),
  },
  {
    name: 'PlaceBid',
    component: PlaceBidScreen,
    options: getHeader({
      title: 'Place Bid',
    }),
  },
  {
    name: 'AuctionDetail',
    component: AuctionDetailScreen,
  },
  {
    name: 'SearchAndFilter',
    component: SearchAndFilterScreen,
  },
  {
    name: 'AllCollections',
    component: AllCollectionsScreen,
    hasLayout: false,
    options: {
      title: 'All collections',
      headerTitleAlign: 'center',
      headerShown: true,
      headerStyle: {
        backgroundColor: Colors.background,
      },
      headerTitleStyle: {
        color: Colors.white,
      },
      headerTintColor: Colors.white,
      animation: 'slide_from_right',
    },
  },
  {
    name: 'AllProducts',
    component: AllProductsScreen,
    hasLayout: false,
    options: {
      title: 'All products',
      headerTitleAlign: 'center',
      headerShown: true,
      headerStyle: {
        backgroundColor: Colors.background,
      },
      headerTitleStyle: {
        color: Colors.white,
      },
      headerTintColor: Colors.white,
      animation: 'slide_from_right',
    },
  },
];

export default routerNoBottomTab;
