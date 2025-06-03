import { supabase } from './supabase';

export const trackVisitor = async () => {
  try {
    // Get IP address from ipify API
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const { ip } = await ipResponse.json();
    
    // Get location data from ip-api
    const locationResponse = await fetch(`http://ip-api.com/json/${ip}`);
    const locationData = await locationResponse.json();
    
    // Store in Supabase
    const { error } = await supabase
      .from('visitors')
      .insert([{
        ip_address: ip,
        country: locationData.country,
        region: locationData.regionName,
        city: locationData.city,
        latitude: locationData.lat,
        longitude: locationData.lon,
        visited_at: new Date().toISOString()
      }]);

    if (error) throw error;
  } catch (error) {
    console.error('Error tracking visitor:', error);
  }
};