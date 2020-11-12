hmapp.factory('ApiService', function (httpService, $q, APIURL, $rootScope) {

	var apiService = {};

    

    apiService.notification = function(msg, type){

        $('body').pgNotification({

            style: 'flip',

            message: msg,

            position: 'top-middle',

            timeout: 1000,

            type: type

        }).show();

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



    apiService.hm_jobs = function(){

        return httpService.get(APIURL+'hm_jobs')

        .then(function (res) {

            return res['data'];

        });

    }



    apiService.hm_save_job = function(data){

        return httpService.post(APIURL+'hm_save_job', data)

        .then(function (res) {

            return res['data'];

        });

    }



    apiService.hm_delete_job = function(id){

        return httpService.post(APIURL+'hm_delete_job', {delete:[id]})

        .then(function (res) {

            return res['data'];

        });

    }



    apiService.hm_change_status = function(st, id){

        return httpService.post(APIURL+'hm_change_status', {status: st, id:id})

        .then(function (res) {

            return res['data'];

        });

    }



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



    apiService.hm_save_category = function(data){

        return httpService.post(APIURL+'hm_save_category', data)

        .then(function (res) {

            return res['data'];

        });

    }



    apiService.hm_save_package = function(data){

        return httpService.post(APIURL+'hm_save_package', data)

        .then(function (res) {

            return res['data'];

        });

    }



    apiService.hm_delete_category = function(id){

        return httpService.post(APIURL+'hm_delete_category', {delete:[id]})

        .then(function (res) {

            return res['data'];

        });

    }



    apiService.hm_delete_package = function(id){

        return httpService.post(APIURL+'hm_delete_package', {delete:[id]})

        .then(function (res) {

            return res['data'];

        });

    }



    apiService.hm_change_status_cat = function(st, id){

        return httpService.post(APIURL+'hm_change_status_cat', {status: st, id:id})

        .then(function (res) {

            return res['data'];

        });

    }



    apiService.hm_change_package_status = function(st, id){

        return httpService.post(APIURL+'hm_change_package_status', {status: st, id:id})

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

    apiService.hm_save_skill = function(data){

        return httpService.post(APIURL+'hm_save_skill', data)

        .then(function (res) {

            return res['data'];

        });

    }





    apiService.hm_delete_skill = function(id){

        return httpService.post(APIURL+'hm_delete_skill', {delete:[id]})

        .then(function (res) {

            return res['data'];

        });

    }



     apiService.hm_change_skill_status = function(st, id){

        return httpService.post(APIURL+'hm_change_skill_status', {status: st, id:id})

        .then(function (res) {

            return res['data'];

        });

    }



    apiService.hm_users = function(){

        return httpService.get(APIURL+'hm_users')

        .then(function (res) {

            return res['data'];

        });

    }



    apiService.hm_company = function(){

        return httpService.get(APIURL+'hm_company')

        .then(function (res) {

            return res['data'];

        });

    }



    apiService.hm_save_user = function(data){

        return httpService.post(APIURL+'hm_save_user', data)

        .then(function (res) {

            return res['data'];

        });

    }





    apiService.hm_delete_user = function(id){

        return httpService.post(APIURL+'hm_delete_user', {delete:[id]})

        .then(function (res) {

            return res['data'];

        });

    }



     apiService.hm_change_user_status = function(st, id){

        return httpService.post(APIURL+'hm_change_user_status', {status: st, id:id})

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



    apiService.hm_save_industry = function(data){

        return httpService.post(APIURL+'hm_save_industry', data)

        .then(function (res) {

            return res['data'];

        });

    }



    apiService.hm_delete_industry = function(id){

        return httpService.post(APIURL+'hm_delete_industry', {delete:[id]})

        .then(function (res) {

            return res['data'];

        });

    }



     apiService.hm_change_industry_status = function(st, id){

        return httpService.post(APIURL+'hm_change_industry_status', {status: st, id:id})

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



    apiService.hm_save_education = function(data){

        return httpService.post(APIURL+'hm_save_education', data)

        .then(function (res) {

            return res['data'];

        });

    }





    apiService.hm_delete_education = function(id){

        return httpService.post(APIURL+'hm_delete_education', {delete:[id]})

        .then(function (res) {

            return res['data'];

        });

    }



     apiService.hm_change_education_status = function(st, id){

        return httpService.post(APIURL+'hm_change_education_status', {status: st, id:id})

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



    apiService.hm_save_joblevel = function(data){

        return httpService.post(APIURL+'hm_save_joblevel', data)

        .then(function (res) {

            return res['data'];

        });

    }





    apiService.hm_delete_joblevel = function(id){

        return httpService.post(APIURL+'hm_delete_joblevel', {delete:[id]})

        .then(function (res) {

            return res['data'];

        });

    }



     apiService.hm_change_joblevel_status = function(st, id){

        return httpService.post(APIURL+'hm_change_joblevel_status', {status: st, id:id})

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



    apiService.hm_save_benefits = function(data){

        return httpService.post(APIURL+'hm_save_benefits', data)

        .then(function (res) {

            return res['data'];

        });

    }





    apiService.hm_delete_benefits = function(id){

        return httpService.post(APIURL+'hm_delete_benefits', {delete:[id]})

        .then(function (res) {

            return res['data'];

        });

    }



     apiService.hm_change_benefits_status = function(st, id){

        return httpService.post(APIURL+'hm_change_benefits_status', {status: st, id:id})

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



    apiService.hm_save_location = function(data){

        return httpService.post(APIURL+'hm_save_location', data)

        .then(function (res) {

            return res['data'];

        });

    }





    apiService.hm_delete_location= function(id){

        return httpService.post(APIURL+'hm_delete_location', {delete:[id]})

        .then(function (res) {

            return res['data'];

        });

    }



     apiService.hm_change_location_status = function(st, id){

        return httpService.post(APIURL+'hm_change_location_status', {status: st, id:id})

        .then(function (res) {

            return res['data'];

        });

    }







    apiService.hm_keywords = function(){

        return httpService.get(APIURL+'hm_keywords')

        .then(function (res) {

            return res['data'];

        });

    }



    apiService.hm_save_keywords = function(data){

        return httpService.post(APIURL+'hm_save_keywords', data)

        .then(function (res) {

            return res['data'];

        });

    }





    apiService.hm_delete_keywords= function(id){

        return httpService.post(APIURL+'hm_delete_keywords', {delete:[id]})

        .then(function (res) {

            return res['data'];

        });

    }



     apiService.hm_change_keywords_status = function(st, id){

        return httpService.post(APIURL+'hm_change_keywords_status', {status: st, id:id})

        .then(function (res) {

            return res['data'];

        });

    }





    apiService.hm_pages = function(){

        return httpService.get(APIURL+'hm_pages')

        .then(function (res) {

            return res['data'];

        });

    }



    apiService.hm_save_page= function(data){

        return httpService.post(APIURL+'hm_save_page', data)

        .then(function (res) {

            return res['data'];

        });

    }





    apiService.hm_delete_page= function(id){

        return httpService.post(APIURL+'hm_delete_page', {delete:[id]})

        .then(function (res) {

            return res['data'];

        });

    }



     apiService.hm_change_page_status = function(st, id){

        return httpService.post(APIURL+'hm_change_page_status', {status: st, id:id})

        .then(function (res) {

            return res['data'];

        });

    }


    apiService.hm_blogs = function(){

        return httpService.get(APIURL+'hm_blogs')

        .then(function (res) {

            return res['data'];

        });

    }



    apiService.hm_save_blogs= function(data){

        return httpService.post(APIURL+'hm_save_blogs', data)

        .then(function (res) {

            return res['data'];

        });

    }





    apiService.hm_delete_blogs= function(id){

        return httpService.post(APIURL+'hm_delete_blogs', {delete:[id]})

        .then(function (res) {

            return res['data'];

        });

    }



     apiService.hm_change_blogs_status = function(st, id){

        return httpService.post(APIURL+'hm_change_blogs_status', {status: st, id:id})

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



    apiService.hm_save_language = function(data){

        return httpService.post(APIURL+'hm_save_language', data)

        .then(function (res) {

            return res['data'];

        });

    }





    apiService.hm_delete_language = function(id){

        return httpService.post(APIURL+'hm_delete_language', {delete:[id]})

        .then(function (res) {

            return res['data'];

        });

    }



     apiService.hm_change_language_status = function(st, id){

        return httpService.post(APIURL+'hm_change_language_status', {status: st, id:id})

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



    apiService.hm_save_designation = function(data){

        return httpService.post(APIURL+'hm_save_designation', data)

        .then(function (res) {

            return res['data'];

        });

    }





    apiService.hm_delete_designation = function(id){

        return httpService.post(APIURL+'hm_delete_designation', {delete:[id]})

        .then(function (res) {

            return res['data'];

        });

    }



    apiService.hm_change_designation_status = function(st, id){

        return httpService.post(APIURL+'hm_change_designation_status', {status: st, id:id})

        .then(function (res) {

            return res['data'];

        });

    }



    apiService.hm_change_password = function(data){

        return httpService.post(APIURL+'hm_change_password?id='+$rootScope.loggedInUserInfo.ID, data)

        .then(function (res) {

            return res['data'];

        });

    }



    apiService.hm_save_admin_profile = function(data){

        return httpService.post(APIURL+'hm_save_admin_profile', data)

        .then(function (res) {

            return res['data'];

        });

    }



    apiService.get_all_lovs  = function(data){

        return httpService.post(APIURL+'get_all_lovs', data)

        .then(function (res) {

            return res['data'];

        });

    }



    apiService.hm_contact_request  = function(data){

        return httpService.post(APIURL+'hm_contact_request', data)

        .then(function (res) {

            return res['data'];

        });

    }



    

    

    return apiService;

});