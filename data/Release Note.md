# Document: Release Note.pdf

## Source
Original file: Release Note.pdf

## Summary
This PDF document contains 2 pages.

## Content
Release Notes for Omada SDN Controller V5.14.32.3  
1. Supported Device Models  
    For device models Omada Software Controller supports, you can refer to: https://www.tp-link.c
om/en/omada-sdn/product-list/
2. New Features  
1. Added support for Controller IP Access Rules in Global View > Settings > Account Security.
2. Added support for Upgrade Logs, Upgrade Schedules, Beta Firmware Program, Cloud  
Firmware Pool and other features in Global View > Firmware.
3. Added support for Audit Logs in Global View: user’s operations will be recorded to facilitate  
system maintenance.
4. Added support to configure the following features with Omada App:
Bandwidth Control
Deep Packet Inspection
IPS/IDS
IP Group
MAC Filtering
Dynamic DNS
WLAN Optimization
Load Balancing
3. Enhancements  
1. Optimized Backup, added support for selection of configurations and data.
2. Optimized Restore, no more support for keeping data after restoring a backup file, only  
configurations can be kept since version 5.14.32.
3. Optimized Export Data distribution, added support for exporting data directly in the  
corresponding feature module.
4. Optimized SSL certificate adaptability, added support for importing certificate chain file in  
PEM format in Global View > Settings > System Settings > HTTPS Certificate.
5. Optimized default settings, enabled Fast Roaming, Gateway LLDP automatically.
6. Optimized the performance when managing clients in huge scale.
7. Optimized the Upgrade Schedule, added support to select model for upgrade, not single  
device anymore.
8. Improved the stability when using the terminal to control devices.
Notes  
1) This version of the Controller is fully applied to the Omada APP of version 4.17  or above.
2) Omada SDN Controller can only manage certain devices running the supported firmware.  
Please confirm that your device is compatible with the SDN Controller.
3) Since version 5.14.32, Omada Software Controller no longer supports upgrade from Controller  
v4.

4) Since version 5.14.32, Omada Software Controller(windows) only supports installation on  
Windows64-bit  platform.

