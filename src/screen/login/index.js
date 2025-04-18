import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  loginUser,
  selectIsAuthLoading,
  selectAuthError,
  clearState,
} from '../../app/reducers/authSlice';

import LogoTechno from '../../assets/logo-techno.png';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const LoginScreen = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const isLoading = useSelector(selectIsAuthLoading);
  const authError = useSelector(selectAuthError);
  const passwordInputRef = useRef(null);

  useEffect(() => {
    dispatch(clearState());
  }, [dispatch]);

  useEffect(() => {
    if (authError && !isLoading) {
      Alert.alert('Login Failed', authError);
    }
  }, [authError, isLoading, dispatch]);

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Input Required', 'Please enter both username and password.');
      return;
    }
    Keyboard.dismiss();
    dispatch(loginUser({username, password}));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Image source={LogoTechno} style={styles.logo} resizeMode="contain" />

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            style={styles.input}
            autoCapitalize="none"
            editable={!isLoading}
            returnKeyType="next"
            onSubmitEditing={() => passwordInputRef.current?.focus()}
            blurOnSubmit={false}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            ref={passwordInputRef}
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
            editable={!isLoading}
            returnKeyType="go"
            onSubmitEditing={handleLogin}
          />
        </View>

        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="#007AFF"
            style={styles.loader}
          />
        ) : (
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={isLoading}
            activeOpacity={0.7}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: screenWidth * 0.05,
    paddingTop: screenHeight * 0.1,
    backgroundColor: '#E5E5E5',
  },
  logo: {
    width: screenWidth * 0.7,
    height: screenHeight * 0.08,
    marginBottom: screenHeight * 0.2,
  },
  inputContainer: {
    width: screenWidth * 0.8,
    marginBottom: screenHeight * 0.025,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 6,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 15,
    paddingVertical: 8,
    width: screenWidth * 0.7,
    borderRadius: 8,
    fontSize: 16,
    color: '#333',
  },
  loader: {
    marginTop: screenHeight * 0.03,
  },
  loginButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 14,
    borderRadius: 8,
    width: screenWidth * 0.5,
    alignItems: 'center',
    marginTop: screenHeight * 0.03,
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  loginButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
