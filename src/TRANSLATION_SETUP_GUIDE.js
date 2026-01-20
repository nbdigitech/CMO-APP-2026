/**
 * TRANSLATION SYSTEM SETUP GUIDE
 * 
 * This guide explains how to add translations to any component in the app.
 */

// STEP 1: Import the hook in your component
// import { useTranslation } from '../../hooks/useTranslation';

// STEP 2: Use the hook inside your component
// const { t } = useTranslation();

// STEP 3: Replace hardcoded strings with translation keys
// Before:  <Text>Hello World</Text>
// After:   <Text>{t.helloWorld}</Text>

// STEP 4: Add the translation keys to allTranslations.js
// In src/locales/allTranslations.js, add:
// EN: { helloWorld: 'Hello World', ... }
// HI: { helloWorld: 'नमस्ते दुनिया', ... }

/**
 * EXAMPLE: Complete component translation
 */

// import React from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import { useTranslation } from '../../hooks/useTranslation';
// 
// const ExampleComponent = () => {
//   const { t } = useTranslation();
//   
//   return (
//     <View>
//       <Text>{t.greeting}</Text>
//       <TouchableOpacity>
//         <Text>{t.submitButton}</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };
// 
// export default ExampleComponent;

/**
 * COMPONENTS ALREADY UPDATED:
 * ✅ DashboardScreen.jsx - All main screen text
 * ✅ Header.jsx - Header text and navigation
 * ✅ LoginScreen.jsx - Login form and messages
 * ✅ RegisterScreen.jsx - Register form and messages
 * ✅ ImageCard.jsx - Card display text
 * ✅ WarningModal.jsx - Warning dialog text
 * ✅ ModalMessage.jsx - Success/Info modals
 * 
 * COMPONENTS READY TO UPDATE:
 * - ForgotPasswordScreen.jsx
 * - VerificationScreen.jsx
 * - MobileRegisterScreen.jsx
 * - UploadPhotoScreen.jsx
 * - PhotoGalleryScreen.jsx
 * - VideoGalleryScreen.jsx
 * - JanPatrikaScreen.jsx
 * - ProfileScreen.jsx
 * - UpdateProfile.jsx
 * - EventCornerScreen.jsx
 * - YoutubeLiveScreen.jsx
 * - SearchEventScreen.jsx
 * - ImageListScreen.jsx
 * - And other screens...
 */

// HOW THE TRANSLATION SYSTEM WORKS:
// 1. User clicks EN-HI button in Header
// 2. Redux action dispatches SET_LANGUAGE action with payload 'HI' or 'EN'
// 3. languageReducer updates the global language state
// 4. Every component using useTranslation() hook gets the new language
// 5. Components automatically re-render with translated text
// 6. No need to manually refresh screens!
