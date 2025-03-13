export function isAuthenticated(): boolean {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("special_sauce");
}

export function logout(){
    localStorage.removeItem("special_sauce");
    window.location.href = "/login";
}