# Document: Duncanins-Audit.docx

## Source
Original file: Duncanins-Audit.docx

## Content






Security Updates

We scanned 10 machine for missing critical patches and they were missing Critical Security Patches that were released on Nov 8th. The missing security patches address recent zero-day vulneralbilites and should be installed as soon as they are released, however it is not unusual for some IT Departments to delay patches, even when tagged as critical. This is not good practice, and in some cases, void Cyber Liability Insurance from some providers. I.e. Travelers.



The missing patches address many published Common Vulnerabilities and Exposures (CVEs) with scores above 7



Windows Updates

In addition to missing Security patches, the scanned machines are also missing Recommended Windows Updates. These updates address and fix bugs and features.



Example of details of missing patches.



Internet Firewall

It was discovered the the the Internet Firewall administrative port was open the the Public Internet, and thus susceptible to brute force attack. The admin UI should be protected by VPN, or Access Control List at minimum. 

Screenshot of Admin interface:





Disk Space on Windows was found to be fine.


3rd party apps should be updated to keep up with Security and Vulnerabilities. For example, Chrome is out of date on most scanned machines. The current version is 108.0.5359.72





