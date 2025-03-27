# Document: Omada Controller Upgrade Guide.pdf

## Source
Original file: Omada Controller Upgrade Guide.pdf

## Summary
This PDF document contains 26 pages.

## Content
Omada Controller Upgrade Guide
Omada SDN Controller 4.1.5 is a major update to the Omada Controller, representing TP-Link’s work 
in developing an integrated and efficient network solution covering nearly all modules and functions.  
TP-Link T eam has strived to maintain the commitment to backward compatibility and straight-forward 
upgrade process. However, given the vast scope of changes in Omada SDN Controller 4.1.5, there 
are inevitably special considerations to be evaluated and actions to be taken in order to successfully 
upgrade from your current controller. This guide provides instructions for upgrading your Omada 
Controller to Release 4.1.5, which maintains your configurations and reduces the overall upgrade 
downtime. 
The guide includes the following sections:
• Introduction to Omada SDN Controller Solution
• Before Y ou Upgrade
• Upgrade Y our Controller

Content
Introduction to Omada SDN Controller Solution  ........................................................................ 1
Before Y ou Upgrade ................................................................................................................................ 1
1 Upgrade Paths and Version Considerations .................................................................................... 1
2 Checking Compatibility Matrix .............................................................................................................. 2
3 Feature Updates ......................................................................................................................................... 2
Features to be configured ............................................................................................................................ 2
Adjusted features ............................................................................................................................................ 3
Upgrade Y our Controller ........................................................................................................................ 4
1 Prepare for Upgrade ................................................................................................................................. 4
2 Upgrade Procedure ................................................................................................................................... 4
Upgrade to Omada Software Controller ................................................................................................. 4
Upgrade on the Same Computer .............................................................................................................. 4
Upgrade Across Devices .............................................................................................................................. 7
Upgrade to Omada Hardware Controller (OC200/OC300)   ......................................................... 12
Upgrade on the Same Omada Hardware Controller ....................................................................... 12
Upgrade to Another Omada Hardware Controller ........................................................................... 16
Upgrade to Omada Cloud-Based Controller ..................................................................................... 20
Upgrade from Omada Software Controller ........................................................................................ 20
Upgrade from Omada Hardware Controller(OC200/OC300) ....................................................... 21

1
  Omada Controller Upgrade Guide
Introduction to Omada SDN Controller Solution 
Omada SDN Controller Solution is designed to provide business-class networking solutions for  
demanding and high-traffic environments, such as campuses, hotels, malls, and offices. Developed from 
Omada Controller that can centrally manage wireless access points, Omada SDN Controller acts as the 
command center of the network and provides a unified approach to configuring enterprise networks 
comprised of routers, switches, and wireless access points. Omada SDN Controller simplifies managing 
large-scale networks and offers easy maintenance, ongoing monitoring, and flexible scalability.
T ailored to different needs and applications, Omada SDN Controller offers diverse deployment solutions: 
Omada Software Controller, Omada Hardware Controller, and Omada Cloud-Based Controller. Newly developed Omada Cloud-Based Controller  controller is deployed on the Omada Cloud server. With a 
paid subscription to Omada Cloud Service, you need not install the software on the host or purchase an 
additional hardware device. Three types of Controller differ in forms, but they serve the same functions 
with management of networks. 
Before Y ou Upgrade
1 Upgrade Paths and Version Considerations
Regardless of which type of Omada Controller you are using, you can upgrade it to different forms of 
Omada SDN Controller.

2
  Omada Controller Upgrade Guide
If you are using a version earlier than Omada Software Controller, Release 3.1.4 (Omada Hardware 
Controller, Release 1.2.0) you need to first upgrade to one of the releases that are listed above and 
then follow the upgrade procedure in this guide.
2 Checking Compatibility Matrix
Omada SDN Controller can configure and manage only the certain devices with supported firmwares. 
View the compatibility matrix below to check if your device is compatible with Omada SDN Controller. 
If the firmware version of your device is lower than the version listed, click the button to download the 
latest firmware and extra the firmware file(.bin), then follow the instructions to upgrade it.
EAP245 V3 
2.20.0 Build 20200423 Rel. 36779 and above
EAP225 V3 
2.20.0 Build 20200422 Rel. 70513 and above
EAP115 V4 
3.20.0 Build 20200525 Rel.36931 and above 
EAP110 V4 
3.20.0 Build 20200525 Rel. 36899 and above
EAP225-Wall V2 
1.20.0 Build 20200422 Rel. 70504 and above
EAP115-Wall V1 
1.20.0 Build 20200509 Rel. 63986 and above
EAP225-Outdoor V1 
1.20.0 Build 20200422 Rel. 70543 and above
EAP110-Outdoor V3 
  
3.20.0 Build 20200511 Rel. 33388 and above
3 Feature Updates
Two levels of functional changes that you should pay attention to when upgrading a controller: features to be configured and adjusted features.
■	 Features to be configured
These features will require manual configuration. In other words, these are features that have a 
direct corresponding solution, but for various reasons cannot be automatically upgraded.
Wireless Control > Access Control Access Control has been updated to ACL in the Network Security 
module in Omada SDN Controller 4.1.5. The new function can be 
applied to specific clients or groups whose traffic passes through the 
gateway, switches and EAPs. 
If you want to restore Access Control configurations, go to Settings 
> Network Security > ACL and configure the EAP ACL rules manually 
after upgrading. 

3
  Omada Controller Upgrade Guide
Wireless Control > Portal Portal has been improved in Omada SDN Controller 4.1.5, which can 
take effect on SSIDs and LAN networks. Only one portal is allowed 
for a single site and supports one authentication type (including No 
Authentication, Simple Password, Hotspot, External RADIUS Server, and External Portal Server). For Hotspot, you can select one or more 
authentication modes from Voucher, Local User, SMS, RADIUS, and 
Facebook.
 If you want to restore Portal configuration, go to Settings > 
Authentication and configure Portal manually after upgrading.
Wireless Control > Free Authentication 
PolicyFree Authentication Policy has been changed to Authentication-Free Policy as a subordinate function of Portal in Omada SDN Controller 
4.1.5, which can allow certain clients to access the internet without Portal authentication.
■	 Adjusted features
These are features that have been adjusted or replaced by new designs.
Wireless Control > Scheduler 
Wireless Control > Scheduler AssociationThe two modules are adjusted to the Profile module in Omada SDN 
Controller 4.1.5, which provides a more flexible and practical approach 
for Time Range customization and association.
Insight > Untrusted Rogue APs 
Insight >Trusted Rogue APsThe two modules are adjusted in Omada SDN Controller 4.1.5. Rogue 
APs Detection can scan all channels to detect all nearby APs by an 
optimized mechanism, but will not sort the rouge APs into Trusted or 
Untrusted in the new release, which simplifies the configuration.
Site Settings > Log Settings For old versions, you need to set both the sender’s and receiver’s 
email address to receive system logs, and set Time Mode to determine 
system logs to be sent at a specific time or time interval.
With Mail Server configured on the Controller module, Omada SDN 
Controller 4.1.5 can send emails for resetting your password, pushing notifications, and delivering the system logs. And the system logs will 
be automatically emailed to the mailbox bound with the administrator 
account at a regular interval.
Controller Settings > User Account The tiered roles of system administrators have been redefined. 
The system administrators of the old controller have three types 
of roles with a descending priority: Administrator (including Root Administrator), Operator, and Observer. Correspondingly, Three 
roles of the new release are Master Administrator, Administrator, and 
Viewer.

4
  Omada Controller Upgrade Guide
Upgrade Y our Controller
1 Prepare for Upgrade
T o successfully upgrade a current controller, ensure that you have performed the following tasks before 
you upgrade: 
1. Download the upgrade bundles and place them in the repository.
2. Read carefully this guide and know the process of upgrading, then plan for an upgrade with minimum 
downtime.
2 Upgrade Procedure
Upgrading is a multistep process and must be performed in the order that is specified in this guide. 
According to your upgrade target, click the tab below to jump quickly to the corresponding page and 
select the suitable scheme for your upgrade.
Upgrade to Omada Software Controller Upgrade to Omada Hardware Controller 
(OC200/OC300)  Upgrade to Omada Cloud-Based 
Controller
■	 Upgrade on the Same Computer
If you want to upgrade to Omada Software Controller 4.1.5 on your current controller host, complete 
the following procedures required for a successful upgrade:
1. Back up your current controller
2. Uninstall the current controller
3. Install Omada Software Controller 4.1.5
4. Import the backup file of the previous controller
5. Upgrade the devices in Omada SDN Controller

5
  Omada Controller Upgrade Guide
▶	Back up your current controller.
Step 1 Go to Controller Settings > Backup&Restore.
Step 2 Select the length of time in days that data will be backed up in the Retained Data Backup drop-
down list. For example, with 7 days selected, the data only in recent 7 days will be backed up.
Step 3 Click Backup to save the current configuration and data in the controller as a backup file.
▶	Uninstall the current controller.
Step 1 In the search box on the taskbar of the controller host, type Control Panel and select it from the 
results. Select Programs > Programs and Features.
Press and hold (or right-click) on the program you want to remove and select Uninstall. Then follow 
the directions on the screen.

6
  Omada Controller Upgrade Guide
Step 2 Click No to completely remove all data of the controller.
▶	Install Omada Software Controller 4.1.5. 
Step 1 Run the installation file and follow the wizard to install the Omada SDN Controller. The installation 
file can be downloaded from https://www.tp-link.com/support/download/omada-software-
controller/.
Step 2 Launch the Omada SDN Controller and follow the step-by-step instructions to complete the Quick 
Setup. After the wizard is finished, a login screen will appear. Enter the username and password you created and click Log in. 
▶	Import the backup file of the previous controller.
Step 1 Go to Settings > Maintenance > Backup & Restore.
Step 2 Click Browse to locate and choose the backup file of the previous controller. Then click Restore to 
upload the file.

7
  Omada Controller Upgrade Guide
▶	Upgrade the devices in Omada SDN Controller.
Step 1 After the backup files imported, the devices will be automatically discovered and adopted by 
the  controller. Go to Devices, and click 
  to upgrade the devices one by one. Or you can click 
 to upgrade the devices in batch.
Step 2
(Optional)To realize custom upgrade, you can click the entry of the device to open the Properties window, 
click Config and then you can upgrade the device’s firmware version manually in Manage 
Device section.
■	 Upgrade Across Devices
If you want to upgrade to Omada software Controller 4.1.5 on another host or from an OC200, 
complete the following procedures required for a successful upgrade:
1. Install Omada Software Controller 4.1.5
2. Migrate your configurations and data from the current controller to the new controller.
3. Upgrade the devices in Omada SDN Controller

8
  Omada Controller Upgrade Guide
▶	Install Omada Software Controller 4.1.5. 
Step 1 Run the installation file and follow the wizard to install the Omada SDN Controller. The installation 
file can be downloaded from https://www.tp-link.com/support/download/omada-software-
controller/.
Step 2 Launch the Omada SDN Controller and follow the step-by-step instructions to complete the Quick 
Setup. After the wizard is finished, a login screen will appear. Enter the username and password 
you created and click Log in. 
▶	Migrate your configurations and data from the current controller to the new controller.
Step 1 On the current controller, go to  Controller Settings > Migrate > Controller Migrate , select the 
length of time in days that data will be backed up in the Retained Data Backup, and click Download Backup File to export the configurations and data of your current controller as a backup file. If you 
have backed up the file, click Skip.

9
  Omada Controller Upgrade Guide
Step 2 Log in to the new controller, go to Settings > Maintenance > Backup & Restore. Click Browse to 
locate and choose the backup file of the previous controller. Then click Restore to upload the file. 
After the file has been restored to the new controller, go back to the previous controller and click 
Confirm.
Step 3 On the current controller, enter the IP address or URL of the new controller into Controller URL/IP input field. Then click Migrate Devices to migrate the devices to the new controller.
  Note:
Make sure that TCP/UDP ports 29810–29813 is enabled on the computer. So the EAPs can communicate with the controller via the ports. If the firewall and antivirus software block these 
ports, they also block the packets between the controller and EAPs.

10
  Omada Controller Upgrade Guide
Step 4 Verify that all the migrated devices are visible and connected on the new controller. When all the 
migrated devices are in Connected status on the Device page on the new controller, click Forget Devices to finish the migration process.
▶	Upgrade the devices in Omada SDN Controller.
Step 1 After the backup files imported, the devices will be automatically discovered and adopted by 
the  controller. Go to Devices, and click 
  to upgrade the devices one by one. Or you can click 
 to upgrade the devices in batch.

11
  Omada Controller Upgrade Guide
Step 2
(Optional)To realize custom upgrade, you can click the entry of the device to open the Properties window, 
click Config and then you can upgrade the device’s firmware version manually in Manage 
Device section.

12
  Omada Controller Upgrade Guide
Upgrade to Omada Software Controller Upgrade to Omada Hardware Controller 
(OC200/OC300)  Upgrade to Omada Cloud-Based 
Controller 
■	 Upgrade on the Same Omada Hardware Controller
If you want to upgrade your OC200 to Omada SDN Hardware Controller (OC200), Release 1.7.0, 
complete the following procedures required for a successful upgrade:
1. Upgrade the firmware of your current controller
2. Import the backup file of the previous controller
3. Upgrade the devices in Omada SDN Controller
▶	Upgrade the firmware of your current controller.
The hardware controller can be upgraded online, or manually in a slightly different way. 
Online Upgrade
Step 1 Go to Controller Settings > Maintenance,  click Download & Upgrade to upgrade the 
controller to interim version 1.2.3.

13
  Omada Controller Upgrade Guide
Step 2 Go to Controller Settings > Backup&Restore.
Select the length of time in days that data will be backed up in the Retained Data Backup 
drop-down list. Click Backup to save the current configuration and data in the controller as 
a backup file.
Step 3 After backup finished, go to Controller Settings > Maintenance,  click Download & 
Upgrade to upgrade the controller to the new version 1.7.0, which is the Omada SDN 
Controller.

14
  Omada Controller Upgrade Guide
Manual Upgrade
Step 1 Go to Controller Settings > Backup&Restore.
Select the length of time in days that data will be backed up in the Retained Data Backup  
drop-down list. Click Backup to save the current configuration and data in the controller as a 
backup file.
Step 2 Go to Controller Settings > Maintenance,  click Browse to locate and choose proper 
firmware file of the new version 1.7.0, which is the Omada SDN Controller.

15
  Omada Controller Upgrade Guide
▶	Import the backup file of the previous controller
Step 1 Go to Settings > Maintenance > Backup & Restore.
Step 2 Click Browse to locate and choose the backup file of the previous controller. Then click Restore to 
upload the file.
▶	Upgrade the devices in Omada SDN Controller.
Step 1 After the backup files imported, the devices will be automatically discovered and adopted by 
the  controller. Go to Devices, and click 
  to upgrade the devices one by one. Or you can click 
 to upgrade the devices in batch.

16
  Omada Controller Upgrade Guide
Step 2
(Optional)To realize custom upgrade, you can click the entry of the device to open the Properties window, 
click Config and then you can upgrade the device’s firmware version manually in Manage 
Device section.
■	 Upgrade to Another Omada Hardware Controller
If you want to upgrade your OC200 or Omada Software Controller to another Omada SDN Hardware 
Controller, complete the following procedures required for a successful upgrade:
1. Deploy Omada SDN Hardware Controller.
2. Migrate your configurations and data from the current controller to the new controller.
3. Upgrade the devices in Omada SDN Hardware Controller.
▶	Deploy Omada SDN Hardware Controller.
Deploy your new hardware controller according to your need and network topology. Then launch the controller and 
follow the step-by-step instructions to complete the Quick Setup.

17
  Omada Controller Upgrade Guide
▶	Migrate your configurations and data from the current controller to the new controller.
Step 1 On the current controller, go to  Controller Settings > Migrate > Controller Migrate , select the 
length of time in days that data will be backed up in the Retained Data Backup, and click Download 
Backup File to export the configurations and data of your current controller as a backup file. If you 
have backed up the file, click Skip.
Step 2 Log in to the new controller, go to Settings > Maintenance > Backup & Restore. Click Browse to 
locate and choose the backup file of the previous controller. Then click Restore to upload the file. 
After the file has been restored to the new controller, go back to the previous controller and click 
Confirm.

18
  Omada Controller Upgrade Guide
Step 3 On the current controller, enter the IP address or URL of the new controller into Controller URL/IP 
input field. Then click Migrate Devices to migrate the devices to the new controller.
  Note:
Make sure that TCP/UDP ports 29810–29813 is enabled on the computer, so the EAPs can communicate with the controller via the ports. If the firewall and antivirus software block these 
ports, they also block the packets between the controller and EAPs.
Step 4 Verify that all the migrated devices are visible and connected on the new controller. When all the 
migrated devices are in Connected status on the Device page on the new controller, click Forget 
Devices to finish the migration process.

19
  Omada Controller Upgrade Guide
▶	Upgrade the devices in Omada SDN Controller
Step 1 After the backup files imported, the devices will be automatically discovered and adopted by 
the  controller. Go to Devices, and click 
  to upgrade the devices one by one. Or you can click 
 to upgrade the devices in batch.
Step 2
(Optional)To realize custom upgrade, you can click the entry of the device to open the Properties window, 
click Config and then you can upgrade the device’s firmware version manually in Manage 
Device section.

20
  Omada Controller Upgrade Guide
Upgrade to Omada Software Controller Upgrade to Omada Hardware Controller 
(OC200/OC300)  Upgrade to Omada Cloud-Based 
Controller 
■	 Upgrade from Omada Software Controller
T o upgrade to Omada Cloud-Based Controller, you need to upgrade to Omada Software Controller 
4.1.5 on your current controller host first. And then migrate the configurations and data from the 
current controller to the Omada Cloud-Based Controller.
1. Refer to Upgrade to Omada Software Controller .
2.  Migrate your configurations and data from the current controller to the new controller.
Step 1 On the current controller, go to  Controller Settings > Migrate > Controller Migrate , select the 
length of time in days that data will be backed up in the Retained Data Backup, and click Export to 
export the configurations and data of your current controller as a backup file. If you have backed 
up the file, click Skip.
Step 2 Log in to the cloud-based controller, go to Settings > Maintenance > Backup & Restore. Click 
Browse to locate and choose the backup file of the previous controller. Then click Restore to upload the file. 
After the file has been restored to the new controller, go back to the previous controller and click 
Confirm.

21
  Omada Controller Upgrade Guide
Step 3 On the current controller, enter the IP address or URL of the new controller into Controller IP/
Inform URL input field. Then click Migrate Devices to migrate the devices to the new controller.
Step 4 Verify that all the migrated devices are visible and connected on the new controller. When all the 
migrated devices are in Connected status on the Device page on the new controller, click Forget Devices to finish the migration process.
■	 Upgrade from Omada Hardware Controller(OC200/OC300)
T o upgrade to Omada Cloud-Based Controller, you need to upgrade to Omada SDN Hardware 
Controller first. And then migrate the configurations and data from the current controller to the 
Omada Cloud-Based Controller.
1. Refer to Upgrade to Omada Hardware Controller .
2.  Migrate your configurations and data from the current controller to the new controller.

22
  Omada Controller Upgrade Guide
Step 1 On the current controller, go to  Controller Settings > Migrate > Controller Migrate , select the 
length of time in days that data will be backed up in the Retained Data Backup, and click Export to 
export the configurations and data of your current controller as a backup file. If you have backed 
up the file, click Skip.
Step 2 Log in to the cloud-based controller, go to Settings > Maintenance > Backup & Restore. Click 
Browse to locate and choose the backup file of the previous controller. Then click Restore to upload the file. 
After the file has been restored to the new controller, go back to the previous controller and click 
Confirm.

23
  Omada Controller Upgrade Guide
Step 3 On the current controller, enter the IP address or URL of the new controller into Controller IP/
Inform URL input field. Then click Migrate Devices to migrate the devices to the new controller.
Step 4 Verify that all the migrated devices are visible and connected on the new controller. When all the 
migrated devices are in Connected status on the Device page on the new controller, click Forget Devices to finish the migration process.

COPYRIGHT & TRADEMARKS
Specifications are subject to change without notice.  is a registered trademark of TP-Link 
Technologies Co., Ltd. Other brands and product names are trademarks or registered trademarks of their 
respective holders.
No part of the specifications may be reproduced in any form or by any means or used to make any 
derivative such as translation, transformation, or adaptation without permission from TP-Link Technologies Co., Ltd. Copyright © 2020 TP-Link Technologies Co., Ltd.. All rights reserved.

