import { useEffect } from 'react';
import {
    View,
    Text,
    ImageBackground,
    ActivityIndicator,
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import { router } from 'expo-router';

export default function SplashScreen() {
    useEffect(() => {
        const timer = setTimeout(() => {
            // Sau khi load xong chuyển sang Home
            router.replace('/');
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <ImageBackground
            source={require('../../../assets/images/splash/image1.png')}
            style={styles.bg}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.safe}>
                {/* Phần text TRAVELHOLIC ở giữa */}
                <View style={styles.centerContent}>
                    <Text style={styles.logo}>TRAVELHOLIC</Text>
                    <Text style={styles.tagline}>CREATE YOUR TRIP</Text>
                </View>

                {/* Phần loading phía dưới */}
                <View style={styles.bottomContent}>
                    <ActivityIndicator color="#ffffff" size="large" />
                    <Text style={styles.loadingText}>Preparing your adventure...</Text>

                    {/* Thanh trắng mỏng ở đáy màn hình */}
                    <View style={styles.bottomBar} />
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    bg: {
        flex: 1,
    },
    safe: {
        flex: 1,
        justifyContent: 'space-between',
    },
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        fontSize: 32,
        fontWeight: '700',
        letterSpacing: 4,
        color: '#ffffff',
    },
    tagline: {
        marginTop: 8,
        fontSize: 14,
        letterSpacing: 2,
        color: '#ffffff',
    },
    bottomContent: {
        paddingHorizontal: 24,
        paddingBottom: 32,
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 14,
        color: '#ffffff',
    },
    bottomBar: {
        marginTop: 24,
        width: '60%',
        height: 4,
        borderRadius: 999,
        backgroundColor: '#ffffff',
        opacity: 0.9,
    },
});