module PugitaEngineHelper
  def pugita_header
    render :partial => 'pugita/header'
  end
  
  def pugita_footer
    render :partial => 'pugita/footer'
  end
end