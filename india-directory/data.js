const directoryData = {
    "North Zone": {
        "Delhi": [
            { name: "Emergency Response", number: "112" },
            { name: "Police Control Room", number: "100" },
            { name: "Fire Station HQ", number: "101" },
            { name: "Ambulance Service", number: "102" },
            { name: "Women Helpline", number: "1091" }
        ],
        "Punjab": [
            { name: "Police Control", number: "112" },
            { name: "Ambulance", number: "108" }
        ],
        "Haryana": [
            { name: "Police", number: "100" },
            { name: "Ambulance", number: "108" }
        ],
        "Uttar Pradesh": [
            { name: "Police Emergency", number: "112" },
            { name: "Women Power Line", number: "1090" }
        ],
        "Jammu & Kashmir": [
            { name: "Police", number: "100" }
        ]
    },
    "South Zone": {
        "Karnataka": [
            { name: "Police", number: "100" },
            { name: "Ambulance", number: "108" },
            { name: "BBMP Control Room", number: "080-22221188" }
        ],
        "Tamil Nadu": [
            { name: "Police", number: "100" },
            { name: "Ambulance", number: "108" }
        ],
        "Kerala": [
            { name: "Police", number: "100" },
            { name: "Women Helpline", number: "1091" }
        ],
        "Telangana": [
            { name: "Police", number: "100" }
        ],
        "Andhra Pradesh": [
            { name: "Police", number: "100" }
        ]
    },
    "East Zone": {
        "West Bengal": [
            { name: "Police", number: "100" },
            { name: "Kolkata Police", number: "1090" }
        ],
        "Odisha": [
            { name: "Police", number: "100" }
        ],
        "Bihar": [
            { name: "Police", number: "100" }
        ],
        "Jharkhand": [
            { name: "Police", number: "100" }
        ]
    },
    "West Zone": {
        "Maharashtra": [
            { name: "Police", number: "100" },
            { name: "Mumbai Police", number: "100" },
            { name: "Ambulance", number: "108" }
        ],
        "Gujarat": [
            { name: "Police", number: "100" }
        ],
        "Rajasthan": [
            { name: "Police", number: "100" }
        ],
        "Goa": [
            { name: "Police", number: "100" }
        ]
    },
    "Central Zone": {
        "Madhya Pradesh": [
            { name: "Police", number: "100" }
        ],
        "Chhattisgarh": [
            { name: "Police", number: "100" }
        ]
    }
};

const stateCities = {
    "Delhi": ["New Delhi", "Delhi", "Noida", "Gurgaon", "Ghaziabad", "Faridabad"],
    "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali"],
    "Haryana": ["Gurgaon", "Gurugram", "Faridabad", "Panipat", "Ambala", "Karnal"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Varanasi", "Meerut", "Prayagraj", "Noida"],
    "Jammu & Kashmir": ["Srinagar", "Jammu", "Anantnag"],
    "Karnataka": ["Bangalore", "Bengaluru", "Mysore", "Mysuru", "Hubli", "Dharwad", "Mangalore", "Belgaum"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli"],
    "Kerala": ["Thiruvananthapuram", "Kochi", "Cochin", "Kozhikode", "Thrissur", "Kollam"],
    "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar"],
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool"],
    "West Bengal": ["Kolkata", "Calcutta", "Howrah", "Durgapur", "Asansol", "Siliguri"],
    "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur"],
    "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"],
    "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad", "Solapur"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer", "Udaipur"],
    "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa"],
    "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain"],
    "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba"]
};
