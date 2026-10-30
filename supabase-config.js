window.projectRSupabase = window.supabase.createClient(
    "https://wehpwlpmngnffarwtiqc.supabase.co",
    "sb_publishable_eCAPNvgQB_1_aW6LQxg3uQ_TwdWSBL3"
);
window.projectRSupabase.auth.getSession()
    .then(({ data, error }) => {
        if (error) {
            console.error("Supabase bağlantı testi başarısız:", error.message);
        } else {
            console.log("Supabase Auth API erişilebilir.");
        }
    });