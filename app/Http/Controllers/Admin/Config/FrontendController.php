<?php

namespace App\Http\Controllers\Admin\Config;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class FrontendController extends Controller
{
    // index
    public function index()
    {
        $faqData = Faq::latest()->get();

        return Inertia::render('admin/frontend/index',[
            'faqData'=>$faqData
        ]);
    }

    // faq ====================
    public function faqStore(Request $request)
    {
        $request->validate([
            'question' => 'required',
            'answer' => 'required|min:5'
        ]);

        Faq::updateOrCreate(['id' => $request->id], $request->except('id'));

        Cache::forget('frontend:faq');

        return back()->with('success', 'Faq Saved success.')->with('_flash_id', time());
    }
    public function faqDelete($id)
    {
        Faq::find($id)->delete();
        Cache::forget('frontend:faq');
        return back()->with('success', 'Faq deleted success.')->with('_flash_id', time());
    }
}
