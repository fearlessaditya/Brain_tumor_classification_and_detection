
import torch
import torch.nn as nn

class UNet(nn.Module):

    def __init__(self):
        super(UNet, self).__init__()

        self.enc1 = nn.Sequential(
            nn.Conv2d(1, 64, 3, padding=1),
            nn.ReLU()
        )

        self.pool1 = nn.MaxPool2d(2)

        self.enc2 = nn.Sequential(
            nn.Conv2d(64, 128, 3, padding=1),
            nn.ReLU()
        )

        self.pool2 = nn.MaxPool2d(2)

        self.bottleneck = nn.Sequential(
            nn.Conv2d(128, 256, 3, padding=1),
            nn.ReLU()
        )

        self.up1 = nn.Upsample(scale_factor=2)

        self.dec1 = nn.Sequential(
            nn.Conv2d(256 + 128, 128, 3, padding=1),
            nn.ReLU()
        )

        self.up2 = nn.Upsample(scale_factor=2)

        self.dec2 = nn.Sequential(
            nn.Conv2d(128 + 64, 64, 3, padding=1),
            nn.ReLU()
        )

        self.out = nn.Conv2d(64, 1, 1)

    def forward(self, x):

        c1 = self.enc1(x)
        p1 = self.pool1(c1)

        c2 = self.enc2(p1)
        p2 = self.pool2(c2)

        b = self.bottleneck(p2)

        u1 = self.up1(b)
        u1 = torch.cat([u1, c2], dim=1)
        c3 = self.dec1(u1)

        u2 = self.up2(c3)
        u2 = torch.cat([u2, c1], dim=1)
        c4 = self.dec2(u2)

        return torch.sigmoid(self.out(c4))
