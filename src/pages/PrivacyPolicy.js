import React from 'react';

function PrivacyPolicy() {
    const containerStyle = {
        textAlign: 'center',
    };

    return (
        <div style={containerStyle}>
            <h1>Privacy Policy</h1>
            <p>
                At GameCraft, we respect your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
            </p>
            <h2>Collection of Your Information</h2>
            <p>
                We may collect information about you in a variety of ways. The information we may collect on the Service includes:
            </p>
            <p><strong>Personal Data</strong>: Personally identifiable information, such as your name, email address, and telephone number, that you voluntarily give to us when you register with the Service or when you choose to participate in various activities related to the Service.</p>
            <p><strong>Derivative Data</strong>: Information our servers automatically collect when you access the Service, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Service.</p>
            <h2>Use of Your Information</h2>
            <p>
                Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Service to:
            </p>
            <p>Create and manage your account.</p>
            <p>Email you regarding your account or order.</p>
            <p>Fulfill and manage purchases, orders, payments, and other transactions related to the Service.</p>
            {/* continue... */}
        </div>
    );
}

export default PrivacyPolicy;