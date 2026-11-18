
const HostProfile = require("../models/HostProfile");

// Approve or reject a host
const updateHostVerification = async (req, res) => {
    try {
        const { status } = req.body;
        const { hostId } = req.params;

        // Validate status
        if (!["verified", "rejected"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Status must be verified or rejected."
            });
        }

        // Find host profile
        const host = await HostProfile.findById(hostId);

        if (!host) {
            return res.status(404).json({
                success: false,
                message: "Host profile not found."
            });
        }

        // Update verification status
        host.verificationStatus = status;
        await host.save();

        return res.status(200).json({
            success: true,
            message: `Host ${status} successfully.`,
            host
        });

    } catch (error) {
        console.error("Host verification error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to update host verification."
        });
    }
};

module.exports = {
    updateHostVerification
};
