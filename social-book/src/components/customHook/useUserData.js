import { useState, useEffect } from "react";
import { supabase } from "../../client";

const useUserData = (userId) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let { data: users, error } = await supabase
          .from("users")
          .select("username, bio, avatar_url")
          .eq("auth_uid", userId);

        if (error) {
          throw error;
        }

        if (users.length > 0) {
          setUserData({
            avatar: users[0].avatar_url,
            name: users[0].username,
            bio: users[0].bio,
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  return userData;
};

export default useUserData;
