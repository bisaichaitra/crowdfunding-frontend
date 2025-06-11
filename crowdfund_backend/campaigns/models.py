from django.db import models
from django.contrib.auth.models import User
from django.db.models import Sum  # for aggregation

class Campaign(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField()
    goal_amount = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    @property
    def amount_raised(self):
        # Use aggregation for performance on large data
        return self.donation_set.aggregate(total=Sum('amount'))['total'] or 0


class Donation(models.Model):
    donor = models.ForeignKey(User, on_delete=models.CASCADE)
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    donated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.donor.username} donated ₹{self.amount}"
