module StaticHelper

  def selected?(regex)
    if regex.is_a?(String)  
       regex = /#{regex}/ 
    end
    @selected = ''
    if !params[:path].nil?
      if params[:path] =~ regex
        @selected = ' class="selected"' 
      end
    elsif params[:controller] =~ regex
      @selected = ' class="selected"'
    end
    @selected.html_safe
  end

end
