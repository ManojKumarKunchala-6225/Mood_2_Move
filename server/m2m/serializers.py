# m2m/serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile # Import the Profile model

class RegisterSerializer(serializers.ModelSerializer):
    # Add phone_number field to accept it during registration
    phone_number = serializers.CharField(max_length=15, write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email', 'phone_number')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Pop the phone number from the validated data
        phone_number = validated_data.pop('phone_number')
        
        # Create the user instance first
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        
        # Create the associated profile with the phone number
        Profile.objects.create(user=user, phone_number=phone_number)
        
        return user

# Keep your other serializers below
class RecommendationRequestSerializer(serializers.Serializer):
    """Handles validation for the recommendation request."""
    mood = serializers.CharField(max_length=100, required=True)
    people = serializers.CharField(max_length=100, required=True)
    location = serializers.CharField(max_length=100, required=True)

class UserProfileSerializer(serializers.ModelSerializer):
    """
    Serializer to get user details including the phone number from the profile.
    """
    # Get the phone_number from the related Profile model
    phone_number = serializers.CharField(source='profile.phone_number')

    class Meta:
        model = User
        # List the fields you want to send to the frontend
        fields = ['id', 'username', 'email', 'phone_number']