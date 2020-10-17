hmapp.factory('ApiService', function (httpService, $q, APIURL, $rootScope) {
	var apiService = {};
    
    apiService.notification = function(msg, type){
        $.toast({
            heading: type,
            text: msg,
            showHideTransition: 'plain',
            icon: type.toLowerCase(),
            position: 'top-right'
        });
    };

    apiService.upload = function(data){
        return httpService
        .post(APIURL+'hm_upload', data)
        .then(function (res) {
            return res['data'];
        });
    };
    
	apiService.login = function (data) {
	    return httpService
        .post(APIURL+'hm_login', data)
        .then(function (res) {
            return res['data'];
        });
    };

    apiService.forgotPassword = function (data) {
        return httpService
        .post(APIURL+'hm_forgot_password', data)
        .then(function (res) {
            return res['data'];
        });
    };

    apiService.resetPassword = function (data) {
        return httpService
        .post(APIURL+'hw_reset_password', data)
        .then(function (res) {
            return res['data'];
        });
    };

    apiService.register = function (data) {
        return httpService
        .post(APIURL+'hm_save_user', data)
        .then(function (res) {
            return res['data'];
        });
    };

    apiService.user_dashboard = function () {
        return httpService
        .post(APIURL+'hm_user_dashboard', {user_id: $rootScope.loggedInUserInfo.id})
        .then(function (res) {
            return res['data'];
        });
    };

    apiService.company_dashboard = function () {
        return httpService
        .post(APIURL+'hm_company_dashboard', {user_id: $rootScope.loggedInUserInfo.id})
        .then(function (res) {
            return res['data'];
        });
    };

    apiService.hm_company = function () {
        return httpService
        .post(APIURL+'hm_company', {})
        .then(function (res) {
            return res['data'];
        });
    };

    apiService.user_profile = function (data) {
        data.user_id = $rootScope.loggedInUserInfo.id;
        return httpService
        .post(APIURL+'hm_user_profile', data)
        .then(function (res) {
            return res['data'];
        });
    };

    apiService.company_profile = function (data) {
        data.user_id = $rootScope.loggedInUserInfo.id;
        return httpService
        .post(APIURL+'hm_company_profile', data)
        .then(function (res) {
            return res['data'];
        });
    };

    apiService.user_applied_job = function () {
        return httpService
        .post(APIURL+'hm_user_applied_job', {user_id: $rootScope.loggedInUserInfo.id})
        .then(function (res) {
            return res['data'];
        });
    };

    apiService.user_shortlist_job = function () {
        return httpService
        .post(APIURL+'hm_user_shortlist_job', {user_id: $rootScope.loggedInUserInfo.id})
        .then(function (res) {
            return res['data'];
        });
    };

    apiService.user_following_employees = function () {
        return httpService
        .post(APIURL+'hm_user_following_employees', {user_id: $rootScope.loggedInUserInfo.id})
        .then(function (res) {
            return res['data'];
        });
    };

    apiService.user_alerts = function () {
        return httpService
        .post(APIURL+'hm_user_alerts', {user_id: $rootScope.loggedInUserInfo.id})
        .then(function (res) {
            return res['data'];
        });
    };


    apiService.company_jobs = function(){
        return httpService.post(APIURL+'hm_company_jobs', {user_id: $rootScope.loggedInUserInfo.id})
        .then(function (res) {
            return res['data'];
        });
    };

    apiService.hm_save_job = function(data){
        data.posted_by = $rootScope.loggedInUserInfo.id;
        return httpService.post(APIURL+'hm_save_job', data)
        .then(function (res) {
            return res['data'];
        });
    };

    apiService.hm_delete_job = function(id){
        return httpService.post(APIURL+'hm_delete_job', {delete:[id]})
        .then(function (res) {
            return res['data'];
        });
    };

    apiService.hm_change_status = function(st, id){
        return httpService.post(APIURL+'hm_change_status', {status: st, id:id})
        .then(function (res) {
            return res['data'];
        });
    };

    apiService.hm_category = function(){
        return httpService.get(APIURL+'hm_category')
        .then(function (res) {
            return res['data'];
        });
    }

    apiService.hm_packages = function(){
        return httpService.get(APIURL+'hm_packages')
        .then(function (res) {
            return res['data'];
        });
    }
     apiService.hm_skills = function(){
        return httpService.get(APIURL+'hm_skills')
        .then(function (res) {
            return res['data'];
        });
    }

    apiService.hm_industry= function(){
        return httpService.get(APIURL+'hm_industry')
        .then(function (res) {
            return res['data'];
        });
    }
    
    apiService.hm_education = function(){
        return httpService.get(APIURL+'hm_education')
        .then(function (res) {
            return res['data'];
        });
    }

    apiService.hm_joblevel = function(){
        return httpService.get(APIURL+'hm_joblevel')
        .then(function (res) {
            return res['data'];
        });
    }

    apiService.hm_benefits = function(){
        return httpService.get(APIURL+'hm_benefits')
        .then(function (res) {
            return res['data'];
        });
    }

    apiService.hm_location = function(){
        return httpService.get(APIURL+'hm_location')
        .then(function (res) {
            return res['data'];
        });
    }
    
    apiService.hm_language = function(){
        return httpService.get(APIURL+'hm_language')
        .then(function (res) {
            return res['data'];
        });
    }
    
    apiService.hm_designation= function(){
        return httpService.get(APIURL+'hm_designation')
        .then(function (res) {
            return res['data'];
        });
    }

    apiService.job_search= function(data){
        return httpService.post(APIURL+'hm_job_search', data)
        .then(function (res) {
            return res['data'];
        });
    }

    apiService.view_company= function(id){
        return httpService.post(APIURL+'hm_view_company', {id: id, user_id: $rootScope.loggedInUserInfo.id})
        .then(function (res) {
            return res['data'];
        });
    }

    apiService.view_job= function(id){
        return httpService.post(APIURL+'hm_view_job', {id: id, user_id: $rootScope.loggedInUserInfo.id})
        .then(function (res) {
            return res['data'];
        });
    }

    apiService.view_candidate= function(id){
        return httpService.post(APIURL+'hm_view_candidate', {id: id, user_id: $rootScope.loggedInUserInfo.id})
        .then(function (res) {
            return res['data'];
        });
    }

    apiService.hm_shortlist_job = function(data){
        return httpService.post(APIURL+'hm_shortlist_job', data)
        .then(function (res) {
            return res['data'];
        });
    };

    apiService.hm_apply_job = function(data){
        return httpService.post(APIURL+'hm_apply_job', data)
        .then(function (res) {
            return res['data'];
        });
    };

    apiService.hm_page_view = function(data){
        return httpService.post(APIURL+'hm_page_view', data)
        .then(function (res) {
            return res['data'];
        });
    };

    apiService.hm_user_view = function(data){
        return httpService.post(APIURL+'hm_user_view', data)
        .then(function (res) {
            return res['data'];
        });
    };

    apiService.hm_company_view = function(data){
        return httpService.post(APIURL+'hm_company_view', data)
        .then(function (res) {
            return res['data'];
        });
    };

    apiService.hm_get_Applicants= function(id){
        return httpService.post(APIURL+'hm_get_Applicants', {job_id: id})
        .then(function (res) {
            return res['data'];
        });
    };

    apiService.hm_company_shortlist= function(){
        return httpService.post(APIURL+'hm_company_shortlist', {user_id: $rootScope.loggedInUserInfo.id})
        .then(function (res) {
            return res['data'];
        });
    };

    apiService.hm_remove_shortlist = function(id){
        return httpService.post(APIURL+'hm_remove_shortlist', {user:id, emp: $rootScope.loggedInUserInfo.id})
        .then(function (res) {
            return res['data'];
        });
    };

    apiService.hm_add_review = function(data){
        return httpService.post(APIURL+'hm_add_review', data)
        .then(function (res) {
            return res['data'];
        });
    };

    apiService.hm_follow = function(data){
        return httpService.post(APIURL+'hm_follow', data)
        .then(function (res) {
            return res['data'];
        });
    };

    apiService.hm_unfollow = function(data){
        return httpService.post(APIURL+'hm_unfollow', data)
        .then(function (res) {
            return res['data'];
        });
    };

    apiService.hm_following_list = function(){
        return httpService.post(APIURL+'hm_following_list', {user_id: $rootScope.loggedInUserInfo.id})
        .then(function (res) {
            return res['data'];
        });
    };

    apiService.hm_shortlist_candidate = function(id){
        return httpService.post(APIURL+'hm_shortlist_candidate', {user_id:id, company_id: $rootScope.loggedInUserInfo.id})
        .then(function (res) {
            return res['data'];
        });
    };

    apiService.hm_featured_company = function(){
        return httpService.post(APIURL+'hm_featured_company', {})
        .then(function (res) {
            return res['data'];
        });
    };

    apiService.hm_featured_job = function(){
        return httpService.post(APIURL+'hm_featured_job', {})
        .then(function (res) {
            return res['data'];
        });
    };

    apiService.get_home_data = function(){
        return httpService.post(APIURL+'get_home_data', {})
        .then(function (res) {
            return res['data'];
        });
    };

    apiService.contact_query = function(data){
        return httpService.post(APIURL+'contact_query', data)
        .then(function (res) {
            return res['data'];
        });
    };    

    apiService.get_all_lovs = function(){
        return httpService.post(APIURL+'get_all_lovs', {})
        .then(function (res) {
            return res['data'];
        });
    };

    apiService.hm_change_password = function(data){
        return httpService.post(APIURL+'hm_change_password?id='+$rootScope.loggedInUserInfo.ID, data)
        .then(function (res) {
            return res['data'];
        });
    };

    return apiService;
});