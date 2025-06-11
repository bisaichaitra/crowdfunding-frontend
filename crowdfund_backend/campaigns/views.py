from decimal import Decimal
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Campaign, Donation
from .serializers import CampaignSerializer
from django.contrib.auth.models import User

@api_view(['GET'])
def list_campaigns(request):
    campaigns = Campaign.objects.all()
    serializer = CampaignSerializer(campaigns, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_campaign(request):
    try:
        owner = request.user if request.user.is_authenticated else User.objects.first()
        if not owner:
            return Response({"error": "No user found in DB"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = CampaignSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=owner)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def donate_to_campaign(request):
    campaign_id = request.data.get('campaign_id')
    amount = request.data.get('amount')

    if not campaign_id or not amount:
        return Response({'error': 'campaign_id and amount are required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        campaign = Campaign.objects.get(id=campaign_id)
        donor = request.user if request.user.is_authenticated else User.objects.first()

        if not donor:
            return Response({'error': 'No donor found'}, status=status.HTTP_400_BAD_REQUEST)

        # ✅ Safely convert amount to Decimal
        donation_amount = Decimal(str(amount))

        # ✅ Create a new donation record
        Donation.objects.create(
            donor=donor,
            campaign=campaign,
            amount=donation_amount
        )

        return Response({'message': 'Donation successful!'}, status=status.HTTP_200_OK)

    except Campaign.DoesNotExist:
        return Response({'error': 'Campaign not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
