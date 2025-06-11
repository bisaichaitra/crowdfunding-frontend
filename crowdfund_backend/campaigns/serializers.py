from rest_framework import serializers
from .models import Campaign, Donation

class CampaignSerializer(serializers.ModelSerializer):
    amount_raised = serializers.SerializerMethodField()

    class Meta:
        model = Campaign
        fields = [
            'id',
            'owner',
            'title',
            'description',
            'goal_amount',
            'created_at',
            'amount_raised',  # ✅ Needed in frontend
        ]
        read_only_fields = ['id', 'owner', 'created_at', 'amount_raised']

    def get_amount_raised(self, obj):
        return obj.amount_raised


class DonationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donation
        fields = ['id', 'donor', 'campaign', 'amount', 'donated_at']
        read_only_fields = ['id', 'donor', 'donated_at']
